(function() {
    var q, b = {}, j = function(e, o, t) {
        var n, c, i, r, s, l = [], a = "=; expires=Thu, 01-Jan-1970 00:00:01 GMT;", u = function(e, o, t, n) {
            var c = new Date;
            c.setTime(c.getTime() + 24 * t * 60 * 60 * 1e3);
            var i = "expires=" + c.toUTCString();
            isSecure = n ? "secure" : "",
            document.cookie = e + "=" + o + ";" + i + ";path=/;" + isSecure
        }, d = function(e) {
            var o = function(e) {
                for (var o = e + "=", t = decodeURIComponent(document.cookie).split(";"), n = 0; n < t.length; n++) {
                    for (var c = t[n]; " " == c.charAt(0); )
                        c = c.substring(1);
                    if (0 == c.indexOf(o))
                        return c.substring(o.length, c.length)
                }
                return ""
            }(e);
            return "" != o && o
        }, _ = function(e) {
            document.cookie = e + a + " path=/;"
        }, p = function() {
            if (i.keep_all_cookies)
                return !1;
            for (var e = document.cookie.split("; "), o = 0; o < e.length; o++) {
                var t = e[o]
                  , n = t.indexOf("=")
                  , c = n > -1 ? t.substr(0, n) : t;
                if (i.cookies_to_exclude.indexOf(c.trim()) > -1)
                    ;
                else
                    for (var r = window.location.hostname.split("."); r.length > 0; ) {
                        var s = encodeURIComponent(e[o].split(";")[0].split("=")[0]) + a + " domain=" + r.join(".") + " ;path="
                          , l = location.pathname.split("/");
                        for (document.cookie = s + "/"; l.length > 0; )
                            document.cookie = s + l.join("/"),
                            l.pop();
                        r.shift()
                    }
            }
        };
        window.cookiemunch_remove_all_cookies = function() {
            if (!document.getElementById("cookie_munch_element"))
                return !1;
            !function() {
                p();
                for (var e = 0; e < n.length; e++) {
                    var o = "cookiemunch_" + n[e].id;
                    _(o);
                    var t = document.getElementById(o);
                    if (t && (t.checked = !1),
                    !i.reload)
                        try {
                            var c;
                            "function" == typeof n[e].declined_function ? c = n[e].declined_function : "string" == typeof n[e].declined_function && (c = new Function(n[e].declined_function)),
                            c()
                        } catch (r) {
                            console.log("cookiemunch declined_function error for id: " + n[e].id),
                            console.log(r.message)
                        }
                }
            }(),
            _("cookiemunch_option_selected"),
            cookiemunch_load_plugin()
        }
        ,
        remove_required_wrapper = function() {
            var e = document.getElementById("cookiemunch_cookies_required");
            e && (e.setAttribute("class", "accepted"),
            document.body.classList.remove("cookiemunch_scroll_block"),
            setTimeout(function() {
                var e = document.querySelector("#cookie_munch_element");
                if (e) {
                    document.body.appendChild(e);
                    var o = document.getElementById("cookiemunch_cookies_required");
                    o && o.parentNode.removeChild(o)
                }
            }, 350))
        }
        ,
        window.cookiemunch_decline = function() {
            if (!document.getElementById("cookie_munch_element"))
                return !1;
            for (var e = 0; e < n.length; e++) {
                var o = document.getElementById("cookiemunch_" + n[e].id);
                o && (o.checked = !1)
            }
            cookiemunch_accept_selected(),
            remove_required_wrapper()
        }
        ,
        window.cookiemunch_accept_all = function() {
            if (!document.getElementById("cookie_munch_element"))
                return !1;
            for (var e = 0; e < n.length; e++) {
                var o = document.getElementById("cookiemunch_" + n[e].id);
                o && (o.checked = !0)
            }
            cookiemunch_accept_selected(),
            remove_required_wrapper()
        }
        ,
        window.cookiemunch_accept_selected = function() {
            if (!document.getElementById("cookie_munch_element"))
                return !1;
            if (m() && d("cookiemunch_option_selected"))
                return k(r, 300),
                !1;
            p();
            for (var e = 0; e < n.length; e++) {
                var o = "cookiemunch_" + n[e].id
                  , t = document.getElementById(o);
                if (t && t.checked) {
                    if (u(o, !0, i.cookies_duration, i.cookies_secure),
                    !i.reload)
                        try {
                            var c;
                            "function" == typeof n[e].accepted_function ? c = n[e].accepted_function : "string" == typeof n[e].accepted_function && (c = new Function(n[e].accepted_function)),
                            c()
                        } catch (l) {
                            console.log("cookiemunch accepted_function error for id: " + n[e].id),
                            console.log(l.message)
                        }
                } else if (_(o),
                !i.reload)
                    try {
                        var s;
                        "function" == typeof n[e].declined_function ? s = n[e].declined_function : "string" == typeof n[e].declined_function && (s = new Function(n[e].declined_function)),
                        s()
                    } catch (l) {
                        console.log("cookiemunch declined_function error for id: " + n[e].id),
                        console.log(l.message)
                    }
            }
            k(r, 300),
            u("cookiemunch_option_selected", !0, i.cookies_duration, i.cookies_secure),
            i.reload ? setTimeout(function() {
                location.reload()
            }, Number(400)) : remove_required_wrapper()
        }
        ;
        var h, m = function() {
            var e = [];
            [].forEach.call(n, function(o) {
                var t = document.getElementById("cookiemunch_" + o.id);
                t && e.push(t.checked)
            });
            for (var o = 0; o < e.length; o++) {
                if (e.length !== l.length)
                    return !1;
                if (e[o] !== l[o])
                    return !1
            }
            return !0
        };
        window.cookiemunch_toggle_popup = function() {
            setTimeout(function() {
                return !!document.getElementById("cookie_munch_element") && !h && !!d("cookiemunch_option_selected") && (i.hide_icon ? "closed-fully" === document.getElementById("cookie_munch_element").className ? g(r, 300) : k(r, 300) : "none" === window.getComputedStyle(r).display ? g(r, 300) : k(r, 300))
            }, 100)
        }
        ;
        var k = function(e, o) {
            h = !0;
            var t = document.getElementById("cookie_munch_element");
            if (i.hide_icon)
                t.setAttribute("style", "transition: 0.3s ease-in-out; opacity:0;"),
                window.setTimeout(function() {
                    t.setAttribute("class", "closed-fully"),
                    h = !1
                }, o);
            else {
                t.setAttribute("style", ""),
                t.setAttribute("class", "closed"),
                e.style.transitionProperty = "height, margin, padding",
                e.style.transitionDuration = o + "ms",
                e.style.boxSizing = "border-box",
                e.style.height = e.offsetHeight + "px";
                var n = e.offsetHeight;
                e.offsetHeight = n,
                e.style.overflow = "hidden",
                e.style.height = 0,
                e.style.paddingTop = 0,
                e.style.paddingBottom = 0,
                e.style.marginTop = 0,
                e.style.marginBottom = 0,
                window.setTimeout(function() {
                    e.style.display = "none",
                    e.style.removeProperty("height"),
                    e.style.removeProperty("padding-top"),
                    e.style.removeProperty("padding-bottom"),
                    e.style.removeProperty("margin-top"),
                    e.style.removeProperty("margin-bottom"),
                    e.style.removeProperty("overflow"),
                    e.style.removeProperty("transition-duration"),
                    e.style.removeProperty("transition-property"),
                    t.setAttribute("class", "closed-fully"),
                    h = !1
                }, o)
            }
        }
          , g = function(e, o) {
            h = !0;
            var t = document.getElementById("cookie_munch_element")
              , c = document.querySelector(".close_panel");
            if (l = [],
            [].forEach.call(n, function(e) {
                var o = document.getElementById("cookiemunch_" + e.id);
                o && l.push(o.checked)
            }),
            i.hide_icon)
                t.setAttribute("style", "transition: 1s ease-in-out; opacity:1;"),
                t.setAttribute("class", "open"),
                d("cookiemunch_option_selected") ? c.setAttribute("style", "display: block;") : c.setAttribute("style", "display: none;"),
                window.setTimeout(function() {
                    t.setAttribute("class", "open-fully"),
                    h = !1
                }, o);
            else {
                t.setAttribute("style", ""),
                t.setAttribute("class", "open"),
                e.style.removeProperty("display");
                var r = window.getComputedStyle(e).display;
                "none" === r && (r = "block"),
                e.style.display = r;
                var s = e.offsetHeight;
                e.style.overflow = "hidden",
                e.style.height = 0,
                e.style.paddingTop = 0,
                e.style.paddingBottom = 0,
                e.style.marginTop = 0,
                e.style.marginBottom = 0;
                var a = e.offsetHeight;
                e.offsetHeight = a,
                e.style.boxSizing = "border-box",
                e.style.transitionProperty = "height, margin, padding",
                e.style.transitionDuration = o + "ms",
                e.style.height = s + "px",
                e.style.removeProperty("padding-top"),
                e.style.removeProperty("padding-bottom"),
                e.style.removeProperty("margin-top"),
                e.style.removeProperty("margin-bottom"),
                d("cookiemunch_option_selected") ? c.setAttribute("style", "display: block;") : c.setAttribute("style", "display: none;"),
                window.setTimeout(function() {
                    e.style.removeProperty("height"),
                    e.style.removeProperty("overflow"),
                    e.style.removeProperty("transition-duration"),
                    e.style.removeProperty("transition-property"),
                    t.setAttribute("class", "open-fully"),
                    h = !1
                }, o)
            }
        }
          , y = function(e, o) {
            e.setAttribute("data-fade-switch", !1),
            e.style.transitionProperty = "height, margin, padding",
            e.style.transitionDuration = o + "ms",
            e.style.boxSizing = "border-box",
            e.style.height = e.offsetHeight + "px";
            var t = e.offsetHeight;
            e.offsetHeight = t,
            e.style.overflow = "hidden",
            e.style.height = 0,
            e.style.paddingTop = 0,
            e.style.paddingBottom = 0,
            e.style.marginTop = 0,
            e.style.marginBottom = 0,
            window.setTimeout(function() {
                e.style.display = "none",
                e.style.removeProperty("height"),
                e.style.removeProperty("padding-top"),
                e.style.removeProperty("padding-bottom"),
                e.style.removeProperty("margin-top"),
                e.style.removeProperty("margin-bottom"),
                e.style.removeProperty("overflow"),
                e.style.removeProperty("transition-duration"),
                e.style.removeProperty("transition-property")
            }, o)
        };
        window.cookiemunch_dropdown = function(e) {
            if (!document.getElementById("cookie_munch_element"))
                return !1;
            var o = document.querySelector(".cookiemunch_wrapper." + e)
              , t = document.querySelectorAll(".cookiemunch_wrapper:not(." + e + ")")
              , n = document.querySelectorAll(".cookiemunch_wrapper_chev")
              , c = document.getElementById("cookiemunch_accept_select")
              , i = document.getElementById("cookiemunch_accept_selected");
            [].forEach.call(n, function(e) {
                e.removeAttribute("data-class-chev-seleted")
            }),
            f(),
            o && ("none" === window.getComputedStyle(o).display ? (!function(e, o) {
                e.style.removeProperty("display");
                var t = window.getComputedStyle(e).display;
                "none" === t && (t = "block"),
                e.style.display = t;
                var n = e.offsetHeight;
                e.style.overflow = "hidden",
                e.style.height = 0,
                e.style.paddingTop = 0,
                e.style.paddingBottom = 0,
                e.style.marginTop = 0,
                e.style.marginBottom = 0;
                var c = e.offsetHeight;
                e.offsetHeight = c,
                e.style.boxSizing = "border-box",
                e.style.transitionProperty = "height, margin, padding",
                e.style.transitionDuration = o + "ms",
                e.style.height = n + "px",
                e.style.removeProperty("padding-top"),
                e.style.removeProperty("padding-bottom"),
                e.style.removeProperty("margin-top"),
                e.style.removeProperty("margin-bottom"),
                window.setTimeout(function() {
                    e.setAttribute("data-fade-switch", !0),
                    e.style.removeProperty("height"),
                    e.style.removeProperty("overflow"),
                    e.style.removeProperty("transition-duration"),
                    e.style.removeProperty("transition-property")
                }, o)
            }(o, 300),
            document.querySelector(".cookiemunch_wrapper_dropdown." + e + " .cookiemunch_wrapper_chev").setAttribute("data-class-chev-seleted", !0),
            s ? i && c && (i.setAttribute("style", "display: block;"),
            c.setAttribute("style", "display: none;")) : "cookiemunch_wrapper_required" !== e ? i && c && (i.setAttribute("style", "display: block;"),
            c.setAttribute("style", "display: none;")) : i && c && (i.setAttribute("style", "display: none;"),
            c.setAttribute("style", "display: block;"))) : (y(o, 300),
            document.querySelector(".cookiemunch_wrapper_dropdown." + e + " .cookiemunch_wrapper_chev").removeAttribute("data-class-chev-seleted"),
            s ? i && c && (i.setAttribute("style", "display: block;"),
            c.setAttribute("style", "display: none;")) : i && c && (i.setAttribute("style", "display: none;"),
            c.setAttribute("style", "display: block;")))),
            t && [].forEach.call(t, function(e) {
                y(e, 300)
            })
        }
        ;
        var f = function() {
            if (!n.length)
                return [];
            groups = [];
            for (var e = 0; e < n.length; e++)
                n[e].group ? -1 === groups.indexOf(n[e].group) && (groups.push(n[e].group),
                s = !0) : -1 === groups.indexOf("Optional") && groups.push("Optional");
            return groups
        }
          , v = function() {
            var e = document.createElement("div")
              , o = document.createElement("div")
              , t = document.createElement("div");
            e.setAttribute("class", "cookiemunch_toggle_view"),
            e.innerHTML = function() {
                for (var e = "", o = f(), t = 0; t < o.length; t++) {
                    if ("Optional" !== o[t])
                        if (n.length && c.length) {
                            var r = "".concat(o[t].replaceAll(/\s/g, "_"), "_group").toLowerCase();
                            e += "\n          <div \n            class=\"cookiemunch_wrapper_dropdown cookiemunch_wrapper_".concat(r, "\"\n            data-cookiemunchdropdown=\"cookiemunch_wrapper_").concat(r, "\"\n            >\n            <span>").concat(o[t], "</span><span class=\"cookiemunch_wrapper_chev\"></span>\n          </div>\n          <div class=\"cookiemunch_wrapper cookiemunch_wrapper_").concat(r, "\" style=\"display: none;\">\n          ")
                        } else
                            e += "\n          <div class=\"cookiemunch_wrapper cookiemunch_wrapper_".concat(o[t], "\" data-fade-switch=\"true\">");
                    if (n.length > 1)
                        for (var l = 0; l < n.length; l++)
                            n[l].group === o[t] && (e += "\n            <div class=\"cookiemunch_container\">\n              <div class=\"cookiemunch_switch_title_container\">\n                <h2>".concat(n[l].name, "</h2>\n                <label class=\"cookiemunch_switch\">\n                  <input id=\"cookiemunch_").concat(n[l].id, "\" type=\"checkbox\" value=\"cookiemunch_").concat(n[l].id, "\" aria-label=\"check box for ").concat(n[l].name, " cookies\">\n                  <span class=\"cookiemunch_slider cookiemunch_round").concat(i.check_switch_icons ? " cookiemunch_switch_icons" : "", "\" >\n                    ").concat(i.check_switch_icons ? "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"36\" height=\"36\" viewBox=\"0 0 24 24\" style=\"fill:#4ADE80;transform:;-ms-filter:\"><path d=\"M10 15.586L6.707 12.293 5.293 13.707 10 18.414 19.707 8.707 18.293 7.293z\"></path></svg>\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"36\" height=\"36\" viewBox=\"0 0 24 24\" style=\"fill:#F87171;transform:;-ms-filter:\"><path d=\"M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z\"></path></svg>" : "", "\n                  </span>\n                </label>\n              </div>\n              <p>").concat(n[l].used_for, "</p>\n              <a rel=\"noreferrer\" target=\"_blank\" href=\"").concat(n[l].url, "\">").concat(n[l].url_text, "</a>\n            </div>"));
                    else
                        1 === n.length && n[0].group === o[t] && (e += "\n          <div class=\"cookiemunch_container\">\n            <div class=\"cookiemunch_switch_title_container\"><h2>".concat(n[0].name, "</h2>\n              <label style=\"pointer-events: none; border-width: 0px;\" class=\"cookiemunch_switch\">\n                <input id=\"cookiemunch_").concat(n[0].id, "\" type=\"checkbox\" value=\"cookiemunch_").concat(n[0].id, "\" aria-label=\"check box for ").concat(n[0].name, " cookies\">\n                <span class=\"checkmark\">\n                  <div class=\"checkmark_stem\"></div>\n                  <div class=\"checkmark_kick\"></div>\n                </span>\n                <span class=\"close\"></span>\n              </label>\n            </div>\n            <p>").concat(n[0].used_for, "</p>\n            <a rel=\"noreferrer\" target=\"_blank\" href=\"").concat(n[0].url, "\">").concat(n[0].url_text, "</a>\n          </div>"));
                    "Optional" !== o[t] && n.length && c.length && (e += "</div>")
                }
                if (o.indexOf("Optional") > -1) {
                    if (n.length && c.length ? e += "\n        <div \n          class=\"cookiemunch_wrapper_dropdown cookiemunch_wrapper_optional\" \n          data-cookiemunchdropdown=\"cookiemunch_wrapper_optional\"\n          >\n          <span>".concat(i.cookie_optional, "</span><span class=\"cookiemunch_wrapper_chev\"></span>\n        </div>\n        <div class=\"cookiemunch_wrapper cookiemunch_wrapper_optional\" style=\"display: none;\">\n        ") : e += "\n        <div class=\"cookiemunch_wrapper cookiemunch_wrapper_optional\" data-fade-switch=\"true\">",
                    n.length > 1 && o.indexOf("Optional") > -1)
                        for (var a = 0; a < n.length; a++)
                            n[a].group || (e += "\n            <div class=\"cookiemunch_container\">\n              <div class=\"cookiemunch_switch_title_container\">\n                <h2>".concat(n[a].name, "</h2>\n                <label class=\"cookiemunch_switch\">\n                  <input id=\"cookiemunch_").concat(n[a].id, "\" type=\"checkbox\" value=\"cookiemunch_").concat(n[a].id, "\" aria-label=\"check box for ").concat(n[a].name, " cookies\">\n                  <span class=\"cookiemunch_slider cookiemunch_round").concat(i.check_switch_icons ? " cookiemunch_switch_icons" : "", "\">\n                    ").concat(i.check_switch_icons ? "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"36\" height=\"36\" viewBox=\"0 0 24 24\" style=\"fill:#4ADE80;transform:;-ms-filter:\"><path d=\"M10 15.586L6.707 12.293 5.293 13.707 10 18.414 19.707 8.707 18.293 7.293z\"></path></svg>\n                    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"36\" height=\"36\" viewBox=\"0 0 24 24\" style=\"fill:#F87171;transform:;-ms-filter:\"><path d=\"M16.192 6.344L11.949 10.586 7.707 6.344 6.293 7.758 10.535 12 6.293 16.242 7.707 17.656 11.949 13.414 16.192 17.656 17.606 16.242 13.364 12 17.606 7.758z\"></path></svg>" : "", "\n                  </span>\n                </label>\n              </div>\n              <p>").concat(n[a].used_for, "</p>\n              <a rel=\"noreferrer\" target=\"_blank\" href=\"").concat(n[a].url, "\">").concat(n[a].url_text, "</a>\n            </div>"));
                    else
                        1 === n.length && o.indexOf("Optional") > -1 && (n[0].group || (e += "\n          <div class=\"cookiemunch_container\">\n            <div class=\"cookiemunch_switch_title_container\"><h2>".concat(n[0].name, "</h2>\n              <label style=\"pointer-events: none; border-width: 0px;\" class=\"cookiemunch_switch\">\n                <input id=\"cookiemunch_").concat(n[0].id, "\" type=\"checkbox\" value=\"cookiemunch_").concat(n[0].id, "\" aria-label=\"check box for ").concat(n[0].name, " cookies\">\n                <span class=\"checkmark\">\n                  <div class=\"checkmark_stem\"></div>\n                  <div class=\"checkmark_kick\"></div>\n                </span>\n                <span class=\"close\"></span>\n              </label>\n            </div>\n            <p>").concat(n[0].used_for, "</p>\n            <a rel=\"noreferrer\" target=\"_blank\" href=\"").concat(n[0].url, "\">").concat(n[0].url_text, "</a>\n          </div>")));
                    e += "</div>"
                }
                if (n.length && c.length ? e += "\n      <div\n        class=\"cookiemunch_wrapper_dropdown cookiemunch_wrapper_required\"\n        data-cookiemunchdropdown=\"cookiemunch_wrapper_required\"\n        >\n        <span>".concat(i.cookie_required, "</span>\n        <span class=\"cookiemunch_wrapper_chev\"></span>\n      </div>\n      <div class=\"cookiemunch_wrapper cookiemunch_wrapper_required\" style=\"display: none;\">") : e += "\n      <div class=\"cookiemunch_wrapper cookiemunch_wrapper_required\" data-fade-switch=\"true\">",
                c.length)
                    for (var u = 0; u < c.length; u++)
                        e += "\n        <div class=\"cookiemunch_container\">\n          <div class=\"cookiemunch_switch_title_container\">\n            <h2>".concat(c[u].name, "</h2>\n          </div>\n          <p>").concat(c[u].used_for, "</p>\n          <a rel=\"noreferrer\" target=\"_blank\" href=\"").concat(c[u].url, "\">").concat(c[u].url_text, "</a>\n        </div>");
                return e += "</div>",
                n.length ? e += "\n      <span class=\"cookiemunch_actions_label\">".concat(i.cookie_accept_label, "</span>") : c.length && (e += "\n      <span class=\"cookiemunch_actions_label\">".concat(i.cookie_required_label, "</span>")),
                e += "\n    <div class=\"cookiemunch_actions\">",
                n.length > 1 ? (c.length ? e += "\n        <button id=\"cookiemunch_decline\">\n          ".concat(i.cookie_button_required, "\n        </button>\n        <button id=\"cookiemunch_accept_selected\" ").concat(s ? "" : "style=\"display: none;\"", ">\n          ").concat(i.cookie_button_selected, "\n        </button>\n        <button \n          data-cookiemunchdropdown=\"cookiemunch_wrapper_optional\"\n          id=\"cookiemunch_accept_select\"  \n          ").concat(s ? "style=\"display: none;\"" : "", ">\n            ").concat(i.cookie_button_select, "\n        </button>\n        ") : e += "\n        <button id=\"cookiemunch_decline\">\n          ".concat(i.cookie_button_none, "\n        </button>\n        <button id=\"cookiemunch_accept_selected\">\n          ").concat(i.cookie_button_selected, "\n        </button>\n        "),
                e += "\n      <button id=\"cookiemunch_accept_all\">\n        ".concat(i.cookie_button_all, "\n      </button>\n      ")) : 1 === n.length ? c.length ? e += "\n        <button class=\"width-half\" id=\"cookiemunch_decline\">\n          ".concat(i.cookie_button_required, "\n        </button>\n        <button class=\"width-half\" id=\"cookiemunch_accept_all\">\n          ").concat(i.cookie_button_all, "\n        </button>\n        ") : e += "\n        <button class=\"width-half\" id=\"cookiemunch_decline\">\n          ".concat(i.cookie_button_no, "\n        </button>\n        <button class=\"width-half\" id=\"cookiemunch_accept_all\">\n          ").concat(i.cookie_button_yes, "\n        </button>\n        ") : c.length && (e += "\n      <button class=\"width-full\" id=\"cookiemunch_accept_all\">\n        ".concat(i.cookie_button_agree, "\n      </button>\n      ")),
                e += "</div>"
            }(),
            o.setAttribute("id", "cookie_munch_element"),
            o.setAttribute("style", "transition: 0.3s ease-in-out; opacity: 0;"),
            i.hide_icon && o.setAttribute("data-class", "cookiemunch_hide_icon"),
            o.setAttribute("class", "open-fully");
            var l = "\n    <img width=\"100%\" height=\"100%\" alt=\"Gerocoo Bistrot logo\" src=\"".concat(i.cookie_image, "\">\n    ")
              , a = "\n    <div class=\"cookie_munch_title_wrap\">\n      <div class=\"cookie_munch_svg\">".concat(l, "</div>\n      <h1 class=titolo>").concat(i.cookie_title, "</h1>\n    </div>\n    <span style=\"display: none;\" id=\"close_panel_btn\" class=\"close_panel\"></span>\n    ");
            o.innerHTML = a,
            t.setAttribute("id", "cookiemunch_cookies_required"),
            i.required && !d("cookiemunch_option_selected") ? (o.appendChild(e),
            t.appendChild(o),
            document.body.appendChild(t),
            document.body.classList.add("cookiemunch_scroll_block")) : (o.appendChild(e),
            document.body.appendChild(o)),
            r = document.querySelector(".cookiemunch_toggle_view"),
            document.querySelector(".cookie_munch_title_wrap").addEventListener("click", function() {
                g(r, 300)
            }),
            d("cookiemunch_option_selected") && k(r, 0);
            var u = document.querySelectorAll("[data-cookiemunchdropdown]");
            [].forEach.call(u, function(e) {
                e.onclick = function() {
                    var o = e.getAttribute("data-cookiemunchdropdown");
                    window.cookiemunch_dropdown(o)
                }
            });
            var _ = document.getElementById("cookiemunch_decline");
            _ && (_.onclick = function() {
                window.cookiemunch_decline()
            }
            );
            var p = document.getElementById("cookiemunch_accept_selected");
            p && (p.onclick = function() {
                window.cookiemunch_accept_selected()
            }
            );
            var h = document.getElementById("close_panel_btn");
            h && (h.onclick = function() {
                window.cookiemunch_accept_selected()
            }
            );
            var m = document.getElementById("cookiemunch_accept_all");
            m && (m.onclick = function() {
                window.cookiemunch_accept_all()
            }
            ),
            setTimeout(function() {
                o.setAttribute("style", "transition: 0.3s ease-in-out; opacity:1;")
            }, 300)
        };
        window.cookiemunch_load_plugin = function() {
            var r = document.getElementById("cookie_munch_element");
            r && r.parentElement.removeChild(r),
            e.settings || (e.settings = {}),
            i = {
                reload: e.settings.reload || !1,
                required: e.settings.required || !1,
                hide_icon: e.settings.hide_icon || !1,
                cookies_to_exclude: e.settings.cookies_to_exclude || [],
                keep_all_cookies: e.settings.keep_all_cookies || !1,
                first_visit_checked: e.settings.first_visit_checked || !1,
                start_dropdown_closed: e.settings.start_dropdown_closed || !1,
                check_switch_icons: e.settings.check_switch_icons || !1,
                cookies_duration: e.settings.cookies_duration || 365,
                cookies_secure: e.settings.cookies_secure || !1,
                cookie_image: e.settings.cookie_image || "img/logo1.png",
                cookie_title: e.settings.cookie_title || "Cookies settings",
                cookie_optional: e.settings.cookie_optional || "Optional",
                cookie_required: e.settings.cookie_required || "Required",
                cookie_accept_label: e.settings.cookie_accept_label || "Accetta Cookies:",
                cookie_required_label: e.settings.cookie_required_label || "These Cookies are required in order for the site to function.",
                cookie_button_none: e.settings.cookie_button_none || "Rifiuta",
                cookie_button_required: e.settings.cookie_button_required || "Required",
                cookie_button_select: e.settings.cookie_button_select || "Select",
                cookie_button_selected: e.settings.cookie_button_selected || "Solo Selezionati",
                cookie_button_all: e.settings.cookie_button_all || "Tutti",
                cookie_button_no: e.settings.cookie_button_no || "No",
                cookie_button_yes: e.settings.cookie_button_yes || "Yes",
                cookie_button_agree: e.settings.cookie_button_close || "Close"
            },
            v(),
            function() {
                for (var e = 0; e < n.length; e++) {
                    var o = "cookiemunch_" + n[e].id
                      , t = document.getElementById(o);
                    if (!t)
                        return !1;
                    d(o) ? t.checked = !0 : t.checked = !1
                }
            }(),
            function() {
                var e, t;
                if (d("cookiemunch_option_selected")) {
                    if (i.hide_icon && document.getElementById("cookie_munch_element").setAttribute("class", "closed-fully"),
                    "function" == typeof o || !1 === o || void 0 === o)
                        for (e = 0; e < n.length; e++)
                            if (t = "cookiemunch_" + n[e].id,
                            d(t))
                                try {
                                    var c;
                                    "function" == typeof n[e].accepted_function ? c = n[e].accepted_function : "string" == typeof n[e].accepted_function && (c = new Function(n[e].accepted_function)),
                                    c()
                                } catch (l) {
                                    console.log("cookiemunch accepted_function error for id: " + n[e].id),
                                    console.log(l.message)
                                }
                            else
                                try {
                                    var r;
                                    "function" == typeof n[e].declined_function ? r = n[e].declined_function : "string" == typeof n[e].declined_function && (r = new Function(n[e].declined_function)),
                                    r()
                                } catch (l) {
                                    console.log("cookiemunch declined_function error for id: " + n[e].id),
                                    console.log(l.message)
                                }
                } else
                    for (e = 0; e < n.length; e++) {
                        t = "cookiemunch_" + n[e].id;
                        var s = document.getElementById(t);
                        i.first_visit_checked ? s.checked = !0 : s.checked = !1
                    }
            }(),
            n.length && c.length && function() {
                if (!i.start_dropdown_closed) {
                    var e = f();
                    s ? cookiemunch_dropdown("cookiemunch_wrapper_".concat(e[0].replaceAll(/\s/g, "_"), "_group").toLowerCase()) : cookiemunch_dropdown("cookiemunch_wrapper_optional")
                }
            }(),
            "function" == typeof o ? o() : "function" == typeof t && t()
        }
        ;
        e ? (n = e.cookies || [],
        c = e.required_cookies || [],
        (0 !== n.length || 0 !== c.length) && setTimeout(function() {
            cookiemunch_load_plugin()
        }, 0)) : (console.log("No cookiemunch object found."),
        console.log("Check documentation at https://cookiemunch.dunks1980.com#examples"))
    };
    void 0 !== b ? (q = j,
    b.cookiemunch = q,
    window.cookiemunch = j) : window.cookiemunch = j;
    if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = b
    } else if (typeof define === "function" && define.amd) {
        define(function() {
            return b
        })
    } else {
        this["window"] = b
    }
}
)();
