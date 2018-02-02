
class TodoList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      text:'',
      items: []
    }
    this.onValueChange = this.onValueChange.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);
    this.onDeleteItem = this.onDeleteItem.bind(this);

    this.indexCounter = 0;
  }

  onValueChange(e){
    this.setState({text:e.target.value});
  }

  onSubmitForm(e){
    e.preventDefault();
    let val = this.state.text;
    if(!val) return;
    let newItem = {
      text:this.state.text,
      id:this.generateId()
    }
    let itemsUpdated = this.state.items.concat(newItem);
    this.setState({
      items: itemsUpdated,
      text: ""
    });
  }

  onDeleteItem(e){
    //console.log(e.target.props.itemKey);
    let itemsUpdated = this.state.items;
    let deleteAtIndex = itemsUpdated.findIndex((elem) => (elem.id == e.target.props.itemKey));
    itemsUpdated.splice(deleteAtIndex,1);
    this.setState({items: itemsUpdated});

  }

  generateId(){
    let id = this.indexCounter;
    this.indexCounter++;
    return id;
  }


  render() {
    return (
      <section className="todoList" >
        <form onSubmit={this.onSubmitForm}>
          <input type="text" value={this.state.text} onChange={this.onValueChange}/>
        </form>
        <ul>
          {
              this.state.items.map( (item, i) => {
                return (
                  <TodoListItem key={item.id} itemKey={item.id} text={item.text} onDelete={this.onDeleteItem}/>
                )
            })
          }
        </ul>
      </section>
    );
  }
}


class TodoListItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    }
    this.onClickDelete = this.onClickDelete.bind(this);

    this.indexCounter = 0;
  }

  onClickDelete(e){
    this.props.onDelete({target:this});
  }

  render(){
    return (
      <li>
        {this.props.text}
        <button onClick={this.onClickDelete}>remove</button>
      </li>
    )
  }

}

const app = document.getElementById('app');
const todolist = <TodoList />;
ReactDOM.render(todolist, app);
