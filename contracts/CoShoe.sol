pragma solidity ^0.5.0;

// initialise contract

contract CoShoe {

    struct Shoe {
        address payable owner;
        bool sold;
        string name;
        //url to image
        string image;
    }
    // state variable of 0.5 ether and convert to wei
    uint public price = 0.5 * 1e18 wei;
    //  state variable shoessold which keeps number of shoes already sold
    // initialise as zero
    uint public shoesSold = 0;

    // public array holding instance of shoes
    Shoe[] public shoes;

    //  map containing balances
    mapping (address => uint) public balances;

    

    // constructor to mint 100 coshoe tokens
    constructor () public {
        // set address of deployer to be owner
        Shoe memory shoeArray;
        
        shoeArray.owner = msg.sender;
        shoeArray.name = "";
        shoeArray.image = "";
        shoeArray.sold = false;

        // use mint function to mint 100  tokens to mintere
        balances[msg.sender] = 100;
        
        // push instances to Shoe array
        shoes.push(shoeArray);
        shoesSold++;
    
    }

    
    // function called buyhsoe
    function buyShoe(string memory _name, string memory _image) public payable {
    
    // find pair of shoes that have not been sold yet
    
    require(shoesSold > 0, "The are no shoes available.");

    // checks value of attahced function is same as price
    require(msg.value == price, "You have not given enough money.");
    
    
    //set owner of shoe to function caller;
    address payable newOwner = msg.sender;
   
    bool newSold = true;
    // push to shoes array
    shoes.push(Shoe(newOwner, newSold, _name ,_image));
    // upgrade value of shoes sold
    shoesSold++;

    }
    
    // function to check purchases
    function checkPurchases() public view returns(bool[] memory) {
        //set empty boolean array of length of number of shoes sold which will check
        // will put true in index of array 
        bool[] memory _soldarray = new bool[](shoesSold);

        for (uint i = 0; i < shoesSold; i++) {
            Shoe storage shoe = shoes[i];
            if( shoe.owner == msg.sender ) {
                _soldarray[i]= true ;
            }
            else {
                _soldarray[i] = false;
            }
        }
        return _soldarray;
        
    }

    


}