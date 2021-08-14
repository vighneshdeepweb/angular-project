import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class CookieService {
    constructor() { }
    setCookie(cname: string, cvalue: string, exdays: number) {
        var d = new Date();
        // d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        //   var expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + ";path=/";
    }

    getCookie(cname: string) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    checkCookie() {
        var user = this.getCookie("username");
        if (user != "") {
            alert("Welcome again " + user);
        } else {
            user = prompt("Please enter your name:", "");
            if (user != "" && user != null) {
                this.setCookie("username", user, 30);
            }
        }
    }

    deleteCookie(name: string) {
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    }
}
