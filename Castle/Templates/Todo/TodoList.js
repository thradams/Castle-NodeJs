class TodoList
{
  Add(text)
  {
    var item = document.createElement('li');
    item.innerText = text;
    
    this.htmlElement.appendChild(item);
  }
}
