// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.



// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
	
  // Create a parent item and two children.
  chrome.contextMenus.create({"title": "URL Shortner", 
  							  "id": "parent",
							  "contexts": ["page", "selection", "link"],
						      "onclick" : clickHandler
						  		});
});



var clickHandler = function(e) {

	
    var url = "https://api-ssl.bitly.com/v3/shorten?";
	var accessToken="0d6ede5e6f6a33bfbd7660106c6b13c5e883229a";
	url+="access_token="+accessToken+"&";
	console.log(e);
	if (e.linkUrl) {
			var str=e.linkUrl;
			var re = new RegExp("^(http|https)://", "i");
			if(!re.test(str)){
				str="http://"+str;
			}
			url+="longUrl="+encodeURI(str);
	 }else if (e.selectionText) {
		var str=e.selectionText;
		var re = new RegExp("^(http|https)://", "i");
		if(!re.test(str)){
			str="http://"+str;
		}
		url+="longUrl="+encodeURI(str);
    } else if (e.pageUrl) {
		var str=e.pageUrl;
		url+="longUrl="+encodeURI(str);
    }
	
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);
	xhr.onreadystatechange = function() {
	  if (xhr.readyState == 4) {
	    // JSON.parse does not evaluate the attacker's scripts.
	    var resp = JSON.parse(xhr.responseText);
		alert(resp.data.url);
	  }
	}
	xhr.send();
};