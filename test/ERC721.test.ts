import { expect } from "chai"
import { beforeEach } from "mocha"
import { Contract } from "ethers"
import { network, ethers } from "hardhat"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"

describe("ERC721", () => {
    let owner: SignerWithAddress
    let alice: SignerWithAddress
    let bob: SignerWithAddress

    let token: Contract

    beforeEach(async () => {
        ;[owner, alice, bob] = await ethers.getSigners()
        const ERC721 = await ethers.getContractFactory("ERC721PsiMock")

        token = await ERC721.deploy("ERC721 Name", "ERC721 Symbol")
        await token.safeMint(alice.address, 1)
    })

    it("Check token balance", async () => {
        expect(await token.balanceOf(alice.address)).to.eq(1)
    })

    it("Transfer token to destination account", async () => {
        await token.connect(alice).transfer(bob.address, 1)
        expect(await token.balanceOf(bob.address)).to.eq(1)
    })

    it("Transfer emits event", async () => {
        await expect(token.connect(alice).transfer(bob.address, 1)).to.emit(token, "Transfer").withArgs(alice.address, bob.address, 1)
    })

    it("Can not transfer wrong token id", async () => {
        await expect(token.connect(alice).transfer(bob.address, 2)).to.be.reverted
    })

    it("Can not transfer from empty account", async () => {
        await expect(token.connect(bob).transfer(alice.address, 1)).to.be.reverted
    })

    it("Calls totalSupply on Token contract", async () => {
        expect(await token.totalSupply()).to.equal(1)
    })
})
