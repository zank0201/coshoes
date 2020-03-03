// import contract artifact
const CoShoe = artifacts.require("./CoShoe.sol")
// const zombieNames = ["Zombie1", "Zombie2"]
const truffleAssert = require("truffle-assertions")

//testing start
contract("CoShoe", function (accounts) {
    // predefine contract instance
    let CoShoeInstance

    //before each test create new contranct instance
    beforeEach(async function () {
        CoShoeInstance = await CoShoe.new()

    })

    //test that 100 tokens are minted on deployment
    it('should test 100 tokens are minted on deployment', async function() {
        // call balances map at accounts[0]
        let minted = await CoShoeInstance.balances(accounts[0])

        assert.equal(minted.toNumber(), 100, "Tokens were not minted upon deployment")
        // this will retrieve zombie created from create zombie and compare it to new zombie
        //assert.equal(zombies.logs[0].args.name, zombieNames[1], "Zombies were not able to be created.")
    

    })

    it('should esure buyshoe correctly transers ownership, sets name, image and sold and updates soldshoes', async function() {
    
        // call buyshoe function
        await CoShoeInstance.buyShoe("nike", "nike.com", {'from': accounts[1], 'value': 5e17})
        // check it transfers ownership correctly
        let shoe_Sold = await CoShoeInstance.shoesSold()
        shoe_Sold = parseInt(shoe_Sold.toNumber())
        let shoeArray = await CoShoeInstance.shoes(1)
        // check that accounts 0 and shoeowner are the same
        assert.equal(shoeArray.owner, accounts[1], "Transfer of account was not succesful")
        //check name and image have been set
        assert.equal(shoeArray.name, "nike", "Name has not been set")
        assert.equal(shoeArray.image, "nike.com", "Image has not been set")
        // check that sold has been set to true
        assert(shoeArray.sold, "sold is not set to true")
        //assert.equal(shoeArray.owner, accounts[2], "Transfer of ownership failed")
        //check that shoesold has been incremented
        assert.equal(shoe_Sold, 2, "Shoes sold has not been updated")
    })

    it('should revert if value given to buy shoe is not 0.5 ether', async function() {
        // it should revert when 0.5 ether has been addded
        await truffleAssert.reverts(CoShoeInstance.buyShoe("puma", "puma.com", {'value': 2}))


    })

    // test if checkpurchases returns the correct number of trues
    it('should return the correct number of trues', async function() {
        // need to buy shoe first
        await CoShoeInstance.buyShoe("nike", "nike.com", {'value': 5e17})
        // call shoessold so we can use length
        let shoe_Sold = await CoShoeInstance.shoesSold()
        // call checkpurchases to get boolean array
        // loop through array and find all instances of true
        // increment using count variable
        let check = await CoShoeInstance.checkPurchases()
        var count = 0
        for(var i = 0; i < check.length; i++) {
            if(check[i] == true){
                count++
            } 
        }
        assert.equal(count, shoe_Sold.toNumber(), "Number of trues is not the same")
    })




    // test that a second zombie cannot be created with same address
    


}





)