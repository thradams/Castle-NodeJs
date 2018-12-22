//Welcome to your first castle app
class Home
{
  OnAdd()
  {    
    this.List.Add(this.Text.htmlElement.value);
    this.Text.htmlElement.value = "";    
  }
}

function Main()
{
  ShowScreen("Home");
}
