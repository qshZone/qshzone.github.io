// Формирование оглавления страницы по заголовкам

// Для формирования на странице необходим элемент с id='table-of-contents'
// В Jekyll имеется встроенная возможность формирования командой {:toc}

(function generateTableOfContents() {
	var toc = document.getElementById("table-of-contents");
	if (toc == null) return;
	
    tocList = document.createElement("ul");    
    headers = document.getElementsByTagName("h2");
   
    for (i = 0; i < headers.length; i++){
	  var name = "h"+i;
	  if (headers[i].id == null) { headers[i].id = name; } 
	  else { name = headers[i].id; }
     
      // a list item for the entry
      tocListItem = document.createElement("li");

      // a link for the h3
      tocEntry = document.createElement("a");
      tocEntry.setAttribute("href","#"+name);
      tocEntry.innerText=headers[i].innerText;
     
      tocListItem.appendChild(tocEntry);
      tocList.appendChild(tocListItem);
    }
    toc.appendChild(tocList);
}());
