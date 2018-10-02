//:::::::::::::::::::::::::::::::::::::::::::::::::VARIABLES:::::::::::::::::::::::::::::::::::::::::::::::::

var comForm = document.forms["StockTransactionForm"];   //get reference to the form object
var table = document.getElementById("recordsTable");    //get reference to the table object
var buyingOrSellingArray = [];                          //build array to hold buying/selling information
buyingOrSellingArray["Buying"] = true;
buyingOrSellingArray["Selling"] = false;
var numShares = 0;                                      //variable for number of shares field
var priceShares = 0;                                    //variable for price of shares field
var commission = 0;                                     //variable for commission field

//::::::::::::::::::::::::::::::::::::::::::::::::::::FUNCTIONS:::::::::::::::::::::::::::::::::::::::::::::::

/*<FUNCTION SUMMARY>
the getLastNameForTable function gets the information input in the last name input box of the form.
and returns the information for the addToTable function
</FUNCTION SUMMARY>*/

function getLastNameForTable() {
    "use strict";
    var getLName = comForm.elements["lName"],
        lName = "";
 
    if (getLName.value !== "") {
        lName = getLName.value;
    }
    
    return lName;
}

/*<FUNCTION SUMMARY>
the getFirstNameForTable function gets the information input in the first name input box of the form.
and returns the information for the addToTable function
</FUNCTION SUMMARY>*/

function getFirstNameForTable() {
    "use strict";
    var getFName = comForm.elements["fName"],
        fName = "";

    if (getFName.value !== "") {
        fName = getFName.value;
    }
    
    return fName;
}

/*<FUNCTION SUMMARY>
the getShareNameForTable function gets the information input in the share name input box of the form.
and returns the information for the addToTable function
</FUNCTION SUMMARY>*/

function getShareNameForTable() {
    "use strict";
    var getShareName = comForm.elements["nameOfShare"],
        shareName = "";
 
    if (getShareName.value !== "") {
        shareName = getShareName.value;
    }
    
    return shareName;
}

/*<FUNCTION SUMMARY>
this function uses the reference to the table, and inserts a row on top
it then creates cells for each of the header cells, and then we set the innerHTML of those cells
to the information from the stock transaction calculator form.
</FUNCTION SUMMARY>*/

function addToTable(t) {
    "use strict";
    var row = table.insertRow(1),
        lNameCell = row.insertCell(0),
        fNameCell = row.insertCell(1),
        sNameCell = row.insertCell(2),
        numSharesCell = row.insertCell(3),
        priceSharesCell = row.insertCell(4),
        commissionCell = row.insertCell(5),
        priceCell = row.insertCell(6);
    
    lNameCell.innerHTML = getLastNameForTable();
    fNameCell.innerHTML = getFirstNameForTable();
    sNameCell.innerHTML = getShareNameForTable();
    numSharesCell.innerHTML = numShares;
    priceSharesCell.innerHTML = priceShares.toLocaleString('en', {style: 'currency', currency: 'USD'});
    commissionCell.innerHTML = commission.toLocaleString('en', {style: 'percent', maximumSignificantDigits: 1});
    priceCell.innerHTML = t.toLocaleString('en', {style: 'currency', currency: 'USD'});
    
    if (t < 0) {
        priceCell.style.backgroundColor = "#7c0a02";
    } 
    
    else {
        priceCell.style.backgroundColor = "green";
    }
}

/*<FUNCTION SUMMARY>
 
This function will return a bool depending on what radial is pressed in the form...
first I get a reference to the form
then i create a variable and set it to false
next i get a reference to the radial buttons with the id buyOrSell
last i loop through the reference i had just created and if something is ticked
i set the bool variable to the value found in the array element created aboves value
break out of the for loop because our buisness here is done
return buy.

</FUNCTION SUMMARY>*/

function figureOutBuyingOrSelling() {
    "use strict";
    var buy = false,
        buyingOrSellingRef = comForm.elements["buyOrSell"],
        i;
    for (i = 0; i < buyingOrSellingRef.length; i++) {
        if (buyingOrSellingRef[i].checked) {
            buy = buyingOrSellingArray[buyingOrSellingRef[i].value];
            break;
        }
    }
    return buy;
}

/*<FUNCTION SUMMARY>
 
This function will return the price the user input in the price of shares field
first i get a reference to the form
then i create a variable to store the priceOfShares element from the form
next i create a variable to store the price
check if the field value is not empty
if its not empty parse the text from the form element and set it to price
return the price

</FUNCTION SUMMARY>*/

function getPriceOfShares() {
    "use strict";
    var getPrice = comForm.elements["priceOfShares"],
        price = 0;
    if (getPrice.value !== "") {
        price = parseFloat(getPrice.value, 10);
    }
    return price;
}

/*<FUNCTION SUMMARY>
 
This function will return the number of shares the user input in the number of shares field
first i get a reference to the form
next get a reference to the element in the form
next create a variable to store the data in and set it to 0
check if the field is not empty
if its not empty parse the text from the form and set it to shares variable
return the shares

</FUNCTION SUMMARY>*/

function getNumberOfShares() {
    "use strict";
    var getNumShares = comForm.elements["numberOfShares"],
        shares = 0;
    if (getNumShares.value !== "") {
        shares = parseFloat(getNumShares.value, 10);
    }
    return shares;
}

/*<FUNCTION SUMMARY>
 
This function will return the commision the user input in the commision field
first i get a reference to the form
then i create a variable to store the commission element from the form
next i create a variable to store the commision
check if the field value is not empty
if its not empty parse the text from the form element and set it to commission
return the commission

</FUNCTION SUMMARY>*/

function getCommissionCost() {
    "use strict";
    var getCommission = comForm.elements["commission"],
        commission = 0;
    if (getCommission.value !== "") {
        commission = parseFloat(getCommission.value);
    }
    return commission;
}

/*<FUNCTION SUMMARY>
 
This function is called when the user selects a radial button on the form
This function takes the Number of shares, price of shares, and commision fields
and calculates the total cost or profit.
first i create a commission total variable and set it to the price * numofshares * commission
then i create a totalCost variable and set it to the price of shares * number of shares
then i create a variable and add the commission total and total cost variables together
lastly i format the total using toLocaleString function (built in) which gives me my comma
next i check if were buying or selling
console log the total, and then set the div element in the form to the total with some text
and set the color eithe red when its costing you money, and green when you have profit.

</FUNCTION SUMMARY>*/

function getTotal() {
    "use strict";
    numShares = getNumberOfShares();
    priceShares = getPriceOfShares();
    commission = getCommissionCost();
    var commissionTotal = priceShares * numShares * commission,
        totalCost = priceShares * numShares,
        total = commissionTotal + totalCost,
        totalFormatted = total.toLocaleString('en', {style: 'currency', currency: 'USD'});
    
    if (figureOutBuyingOrSelling() === true) {
        console.log("Total cost of transaction: " + totalFormatted);
        document.getElementById("totalAmount").innerHTML = "Total Cost: " + totalFormatted;
        document.getElementById("totalAmount").style.backgroundColor = "red";
        addToTable(-total);
    } else {
        console.log("Total profit of transaction: " + totalFormatted);
        document.getElementById("totalAmount").innerHTML = "Total Profit: " + totalFormatted;
        document.getElementById("totalAmount").style.backgroundColor = "green";
        addToTable(total);
    }
}
