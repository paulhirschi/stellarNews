function loadMoreShizzle(){var e=contain.offsetHeight,t=window.pageYOffset,n=t+window.innerHeight;n>=e&&(window.onscroll=!1,ajaxThisShizzle(),setTimeout(function(){window.onscroll=loadMoreShizzle},800))}var loading=document.getElementById("loading"),end=document.getElementById("end"),contain=document.getElementById("newsFeed"),offset=0,ajaxThisShizzle=function(){var e="http://www.stellarbiotechnologies.com/media/press-releases/json?limit=10&offset="+offset,t=new XMLHttpRequest;t.onreadystatechange=function(){if(!t||4===t.readyState&&200===t.status){var e=JSON.parse(t.responseText),n=e.news;if(n.length>0)for(var o=0;o<n.length;o++){n.sort(function(e,t){return parseFloat(t.published)-parseFloat(e.published)});var i=document.createElement("A");i.setAttribute("href","#");var l='<div class="newsItem"><h2>'+n[o].title+"</h2>",s="<p>"+n[o].published+"</p></div>";i.innerHTML+=l+s,contain.appendChild(i),loading.style.display="block"}else loading.style.display="none",end.style.display="block";offset+=10}},t.open("GET",e),t.send()};ajaxThisShizzle(),window.onscroll=loadMoreShizzle;