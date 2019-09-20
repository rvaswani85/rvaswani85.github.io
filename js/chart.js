// ticking chart
window.onload = function () {

    var dps = []; // dataPoints
    var chart = new CanvasJS.Chart("chartContainer", {
        title: {
            //text: "Stock Prices",
            //fontSize:15,
            fontColor: "black"
        },
        axisY: {
            title: 'Stock Price(USD)',
            labelFontSize: 10,
            includeZero: false,
            labelFontSize: 10,
            titleFontSize: 15

        },

        axisX: {
            labelFontSize: 10,
        },


        data: [{
            type: "line",
            dataPoints: dps,
            lineColor: "black", // add white line
            markerType: "triangle",
            markerColor: "black"

        }],

        backgroundColor: "#f0efef", // background
    });

    var xVal = 0;
    var yVal = 100;
    var updateInterval = 1000;
    var dataLength = 20; // number of dataPoints visible at any point

    var updateChart = function (count) {

        count = count || 1;

        for (var j = 0; j < count; j++) {
            yVal = yVal + Math.round(5 + Math.random() * (-5 - 5));
            dps.push({
                x: xVal,
                y: yVal
            });
            xVal++;
        }

        if (dps.length > dataLength) {
            dps.shift();
        }

        // makes chart dynamic
        chart.render();

        // passes Y axis value to tickprice function (data length = 20)
        tickPrice(chart.data[0].dataPoints[19].y,
            chart.data[0].dataPoints[18].y)

    };

    updateChart(dataLength);
    setInterval(function () { updateChart() }, updateInterval);

}

// will keep track of the current stock prices
function tickPrice(tickPrice, prevPrice) {

    let strVar = "DUNDER MIFFLIN INC. [NYSE:DMI] " + upDown(tickPrice)

    function upDown(tickPrice) {
        if (tickPrice > prevPrice) {
            return ("$ " + tickPrice + ' ' + "&#8593;").fontcolor('green')
        } else {
            return ("$ " + tickPrice + ' ' + "&darr;").fontcolor('red')
        }
    }

    $('.appHome').html(strVar)

}


// Order Form and Table
function onReady() {

    let ordCnt = 0
    let tot_quantity =0
    let tot_value = 0
    let new_balance = 0

    $('#buySell').submit(onSubmit)

    function onSubmit(event) {

        //will prevent page refresh
        event.preventDefault()

        //read form inputs and parse to int
        let quantityBuySell = $('#qtyBuySell').val()
        let orderType = $('#orderBuySell').val()
        let priceBuySell= $('#currTick').text().split(" ") 
        let acctBalance = $('#startBalance').val() //initial balance

        $("#startBalance").prop('disabled', true);
        
        // increment order count
        ordCnt = ordCnt + 1

        // get current quantity with sign
        let quantity = parseInt(quantityBuySell)
        if (orderType == 'sell'){
            quantity = quantity*-1
        }
        
        // get current price, value
        let price = parseInt(priceBuySell[5]) //current price
        let value = quantity * price //curr market value

        // get current balance
        if(ordCnt == 1) {
            new_balance = parseInt(acctBalance) - value // for order 1 balace = initial balance
        } else {
            new_balance =  new_balance - value // remaining balance after +- value
        }

        //console.log(orderType)
        //console.log(quantity)
        //console.log(price)
        //console.log(value)
        //console.log(balance

        tot_quantity = tot_quantity + quantity
        tot_value = tot_value + value
        //new_balance = tot_balance + cur_balance
        
        $('#stockTable').append("<tr><td>" + ordCnt + "</td><td>" 
        + orderType + "</td><td>" 
        + quantity + "</td><td> $" 
        + price + "</td><td> $" 
        + value + "</td><td> $"
        + new_balance + "</td></tr>"
        )

        $('#total').html("<tr><td>" + 'Tot' + "</td><td>" 
        + '' + "</td><td>" 
        + tot_quantity + "</td><td>" 
        + '' + "</td><td> $" 
        + tot_value + "</td><td> $"
        + new_balance + "</td></tr>"
        )

        let ret = Math.round(((new_balance-acctBalance)/parseInt(acctBalance))*100)

        $('#returnPct').html(`Your Return in Percentage ${ret} %`)
        
}

}

$('document').ready(onReady())