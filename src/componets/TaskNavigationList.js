import React, {useEffect, useState} from "react";
import listSvg from "./userInterface/035-menu.svg";
import {List,AddListButton,Tasks} from "./index.jsx";
import axios from "axios";
import {Route,useHistory} from "react-router-dom";
import ShowListButton from "./ShowListButton";

const Navigation=()=> {

    const[lists,setLists]=useState(null);
    const [colors,setColors]=useState(null);
    const [activeItem,setActiveItem]=useState(null);

    let history = useHistory();

    useEffect(()=>{
        axios.get('http://localhost:3004/lists?_expand=color&_embed=tasks').then(({data})=>{

            setLists(data);
        });
        axios.get('http://localhost:3004/colors').then(({data})=>{
            setColors(data);
        });
    },[]);

    const onAddList=(obj)=>{
      const newList = [
          ...lists,
          obj
      ];
      setLists(newList);
    };

    const onAddTask=(listId,taskObj)=>{
        const newList = lists.map(item=>{
            if(item.id===listId){
                item.tasks=[...item.tasks,taskObj]
            }
            return item;
        });
        setLists(newList);
    };
    const onEditListTitle=(id,title)=>{
        const newList = lists.map(item=>{
            if(item.id === id)
                item.name=title;
            return item;
        });
        setLists(newList);
    };
    const onRemoveTask=(listId,taskId)=>{

        if(window.confirm("Are you sure?")){
            const newList = lists.map(item=>{
                if(item.id===listId){
                    item.tasks = item.tasks.filter(task => task.id !== taskId);
                }
                return item;
            });
            setLists(newList);
            axios.delete(`http://localhost:3004/tasks/${taskId}`).catch(()=>{
                alert("Something went wrong...");
            });
        }
    };

    const onCompleteTask=(listId, taskId, completed)=>{
        const newList = lists.map(list=>{
            if(list.id === listId){
                list.tasks=list.tasks.map(task=>{
                    if(task.id === taskId){
                        task.completed = completed;
                    }
                    return task;
                })
            }
            return list;
        });
        setLists(newList);
        axios.patch(`http://localhost:3004/tasks/${taskId}`,{
            completed
        }).catch(()=>{
            alert("Something went wrong...");
        });
    };

    const onEditTask=(listId,id,text)=>{
      if(!text)
          return;
        console.log("ok",text);
        const newList = lists.map(list=>{
            if(list.id === listId){
                list.tasks=list.tasks.map(task=>{
                    if(task.id === id){
                        task.text=text;
                    }
                    return task;
                })
            }
            return list;
        });

        setLists(newList);
        axios.patch(`http://localhost:3004/tasks/${id}`,{
            text
        }).catch(()=>{
            alert("Something went wrong...");
        });
    };

    useEffect(()=>{
        const listId = history.location.pathname.split('lists/')[1];
        if(lists) {
            const list = lists.find(list => list.id === Number(listId));
            setActiveItem(list);
        }

    },[lists,history.location.pathname]);


return(

  <div className="todo" >
      <ShowListButton/>
      <div className="todo__sidebar">

        <List
            onClickItem={list=>{
                history.push(`/`)
            }}
            items={[
            {
                active:history.location.pathname==='/',
                icon:(<img className="svg" src={listSvg} alt="List icon"/>),
                name:"All tasks",
            }
        ]}
        isRemoveable={true}
        />
          {lists ?(
          <List
              items={lists}
                isRemovable={true}
              onRemove={(id)=>{
                  const newLists=lists.filter(item=>item.id !==id);
                  setLists(newLists);
              }}
              onClickItem={list=>{
                  history.push(`/lists/${list.id}`)
              }}
              activeItem={activeItem}
          />
              ):('Loading...')}
        <AddListButton  onAdd={onAddList} colors={colors}/>
      </div>
      <div className="todo__tasks">
          <Route exact path="/">
              {lists&&
                  lists.map(list =>
                      <Tasks
                          key={list.id}
                          list={list}
                          onEditTitle={onEditListTitle}
                          onAddTask={onAddTask}
                          withoutEmpty
                          onRemoveTask={onRemoveTask}
                          onEditTask={onEditTask}
                          onCompleteTask={onCompleteTask}
                      />
                  )
              }
          </Route>




          { lists&&activeItem&&
          <Tasks
              list={activeItem}
              onEditTitle={onEditListTitle}
              onAddTask={onAddTask}
              onRemoveTask={onRemoveTask}
              onEditTask={onEditTask}
              onCompleteTask={onCompleteTask}
          />

          }

      </div>
  </div>
);
};

export default Navigation