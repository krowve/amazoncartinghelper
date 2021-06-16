// ==UserScript==
// @name         amazoncartinghelper
// @namespace    http://tampermonkey.net/
// @version      2021061201
// @description  try to take over the world!
// @author       You
// @match        https://www.amazon.com/*
// @icon         https://www.google.com/s2/favicons?domain=mozilla.org
// @grant        none
// ==/UserScript==

// Set amazonrefreshcout in localStorage from the console
// Must reset after it hits 100
// localStorage.setItem("amazonrefreshcount","0");

(function() {
    'use strict';

    var pricelimit = 1000;
    var refreshlimit = "100";
    console.log("amazonrefreshcount = " + localStorage.getItem("amazonrefreshcount"));
    if (document.title.includes("Amazon.com: Please Confirm Your Action")) {
        console.log(document.title);
        localStorage.setItem("producturl",location.href)
        if (localStorage.getItem("amazonrefresh") == 1) {
            localStorage.setItem("amazonrefresh","0");
            console.log("Reloading");
            setTimeout(function(){ location.reload() }, 1000);
            location.reload();
        } else {
            localStorage.setItem("amazonrefresh","1");
        }
        if ((localStorage.getItem("amazonrefreshcount")) > parseInt(refreshlimit)) {
            return;
        } else {
            var mynum = parseInt(localStorage.getItem("amazonrefreshcount"));
            mynum++;
            localStorage.setItem("amazonrefreshcount",String(mynum));
        }
        if (document.getElementsByClassName("a-button-input").length) {
            console.log("click it");
            //localStorage.setItem("amazonrefreshcount","0");
            document.getElementsByClassName("a-button-input")[0].click();
        } else {
            console.log("not in stock");
            setTimeout(function(){ location.reload() }, 2000);
            return;

        }
    }

    if (document.title.includes("Amazon.com Shopping Cart")) {
        var shoppinginterval = setInterval(function() {
          console.log(document.title);

          if (document.getElementsByClassName("sc-your-amazon-cart-is-empty").length) {
              console.log("Empty Cart");
              window.location = localStorage.getItem("producturl");
          } else {
              console.log("checkout");
              if (document.getElementsByName("proceedToRetailCheckout").length) {
              document.getElementsByName("proceedToRetailCheckout")[0].click();
              }
              //if (document.getElementsByClassName("a-button-text a-text-center").length) {
              //document.getElementsByClassName("a-button-text a-text-center")[0].click()
              //}
          }
          if (document.getElementsByClassName("a-spacing-mini a-spacing-top-base")[0].innerText.includes("Your Amazon Cart is empty.")) {
              console.log("Empty Cart");
              window.location = localStorage.getItem("producturl");
          }
          console.log("Shopping Cart Interval");
          //history.back();
          //clearInterval(shoppinginterval);
          //location.reload();
        },1000);
    }


    if (document.title.includes("Select a shipping address")) {
        console.log("Select a shipping address");
        document.getElementsByClassName("a-declarative a-button-text")[0].click();
    }

    if (document.title.includes("Out of Stock - Amazon.com Checkout")) {
        console.log("Out of Stock");
        window.location = localStorage.getItem("producturl");
    }





    if (document.title.includes("Select a Payment Method - Amazon.com Checkout")) {
        setInterval(function() {
          console.log("Select a Payment Method - Amazon.com Checkout");
          localStorage.setItem("abort","1");
          document.getElementsByClassName("a-button-input a-button-text")[0].click();
        },2000);
    }

    if (document.title.includes("Select Shipping Options - Amazon.com Checkout")) {
        setInterval(function() {
          console.log("Select Shipping Options - Amazon.com Checkout");
          document.getElementsByClassName("a-button-text")[0].click();
          location.reload();
        },2000);
    }

    if (document.title.includes("Amazon.com:")) {
        console.log("Looking for ATC");
        setInterval(function() {
            console.log("In ATC function");
            if (document.getElementsByName("submit.addToCart").length) {
                var price = document.getElementsByClassName("a-offscreen")[0].innerText;
                if (parseInt(price) < pricelimit) {
                  document.getElementsByName("submit.addToCart")[0].click()
                }
            }
            var mynum2 = parseInt(localStorage.getItem("amazonrefreshcount"));
            mynum2++;
            localStorage.setItem("amazonrefreshcount",String(mynum2));
            setTimeout(function() { location.reload() }, 1000);
            return;
        },3000);
    }

    if (document.getElementsByClassName("h1")[0].innerText.includes("Oops! We're sorry")) {
        console.log("Oops");
        window.location = localStorage.getItem("producturl");
    }
})();
