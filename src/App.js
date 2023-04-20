
import React from 'react';
import './assets/font-awesome-4.7.0/css/font-awesome.css';
import './assets/css/bootstrap.css';



class App extends React.Component
{

  
  constructor(props)
  {
    super(props);
    this.state = {
      mode:"Add",
      "update_id":-1,
      grades:[],
      course_err:"",
      grades_err:"",
      add_course:{
        course:"",
        grades:""
      },
      max:0,
      min:0,
      avg:0
    }

    

     this.add_grade = this.add_grade.bind(this);
     this.delete_grade = this.delete_grade.bind(this);
     this.update_grade = this.update_grade.bind(this);
     this.handle_course = this.handle_course.bind(this);
     this.handle_grades = this.handle_grades.bind(this);
     this.refresh_analytics = this.refresh_analytics.bind(this);

  }
  

  add_grade(e)
  {
    e.preventDefault();
    console.log('inv');
    let has_error = false;

    if(this.state.add_course.course === "")
    {
      this.setState({
        course_err:"Course can not be empty"
      });

      has_error = true;
    }
    else
    {
      this.setState({
        course_err:""
      });
    }

    if(parseFloat(this.state.add_course.grades) < 0 || parseFloat(this.state.add_course.grades) > 100 || isNaN(this.state.add_course.grades) || this.state.add_course.grades == "")
    {
      this.setState({
        grades_err:"Grades must be a number b/w 0-100"
      });
      has_error = true;
    }
    else
    {
      this.setState({
        grades_err:""
      });
    }


    if(has_error)
    {
      return;
    }


    let temp = [...this.state.grades];

    if(this.state.mode === "Add")
    {
      temp.push({
        "course":this.state.add_course.course,
        "grades":this.state.add_course.grades,
      });
    }
    else
    {

      temp[this.state.update_id] = {
        "course":this.state.add_course.course,
        "grades":this.state.add_course.grades,
      };
      

    }

    this.setState({
      grades:temp,
      "mode":"Add",
      "update_id":-1
    });


    this.setState({

      add_course:{"course":"","grades":""}

    });

    this.refresh_analytics();

  }

  delete_grade(index)
  {

    let arr = [...this.state.grades];

    arr.forEach((e,i)=>{

      if(i === index)
      {
        arr.splice(i,1);
       
      }

    });

    this.setState({
      grades:arr
    });

    this.refresh_analytics();
  }

  update_grade(index)
  {

    let arr = [...this.state.grades];

    arr.forEach((e,i)=>{

      if(i === index)
      {
        
        this.setState({
          add_course:{"course":e.course,"grades":e.grades},
          mode:"Update",
          "update_id":i
        });
       
      }

    });

    this.refresh_analytics();
  }

  handle_course(e)
  {
    let value = e.target.value;

    this.setState(()=>{
      let obj = this.state.add_course;
      obj.course = value; 
     
      return {obj};
    });

   
    
    
  }

  handle_grades(e)
  {
    let value = e.target.value;

    this.setState(()=>{
      let obj = this.state.add_course;
      obj.grades = value; 
      return {obj}
    });
  }

  refresh_analytics()
  {
    let total = 0;
    
    setTimeout(() => {
      let arr = [...this.state.grades];

      if(this.state.grades.length > 0)
      {
        this.setState({
          min:this.state.grades[0].grades,
          max:this.state.grades[0].grades,
        });
      }
    
    arr.forEach((v,i)=>{

      
      if(this.state.min > v.grades)
      {
        this.setState({
          min:v.grades
        });
      }

      if(this.state.max < v.grades)
      {
        this.setState({
          max:v.grades
        });
      }

      total += parseFloat(v.grades);

    });

    
    if(this.state.grades.length > 0)
    {
      this.setState({
        avg:(total/this.state.grades.length)
      });
    }
    else
    {
      this.setState({
        avg:0,
        max:0,
        min:0
      });
    }
    }, 1000);
  }
  

  render()
  {
    return(
      <div>
        <div className="center-section-1">
          <div className="center-section-1__container">
              <div className="center-section-1__header">
                  <h2 className="heading">Enter Grades</h2>
              </div>
              <div className="center-section-1__body">
                  <form className="form-1" action="#">
                      <div className="group">
                          <label><b>Course Name</b></label>
                          <input onChange={this.handle_course} type="text" placeholder="e.g. English" value={this.state.add_course.course}  />
                      </div>
                      <div className="group">
                        <label><b>Grades</b></label>
                          <input onChange={this.handle_grades} type="text" placeholder="Between 0-100" value={this.state.add_course.grades}  />
                      </div>
                      <div className="group">
                          <input onClick={this.add_grade} type="submit" className="button button-primary " value={this.state.mode} />
                      </div>
                  </form>

                  <ul id="err-msg" >
                    <li>{this.state.course_err}</li>
                    <li>{this.state.grades_err}</li>
                  </ul>

              </div>
  
          </div>
        </div>
        <div className="center-section-1">
          <div className="center-section-1__container">
              <div className="center-section-1__header">
                  <h2 className="heading">Courses & Grades</h2>
              </div>
              <div className="center-section-1__body">
                  <table className="table table-1">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Course</th>
                        <th>Grade</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      
                        {
                          
                          this.state.grades.map((v,i)=>{
                            
                            return (
                              <tr key={i}>
                                <td>{i+1}</td>
                                <td>{v.course}</td>
                                <td>{v.grades}</td>
                                <td>
                                  <span  onClick={this.update_grade.bind(this,i)} style={{marginRight:"10px"}} className="btn btn-sm button-primary">Edit&nbsp;<i className="fa fa-pencil"></i></span>
                                  <span  onClick={this.delete_grade.bind(this,i)} className="btn btn-sm button-red">Delete &nbsp;<i className="fa fa-trash"></i></span>
                                </td>
                              </tr>
                            )

                          })
                        }
                     
                    </tbody>
                  </table>
              </div>
  
          </div>
        </div>

        <div className="center-section-1">
          <div className="center-section-1__container">
              <div className="center-section-1__header">
                  <h2 className="heading">Analytics</h2>
              </div>
              <div className="center-section-1__body">
                  <table className="table table-1">
                    <thead>
                      <tr>
                       
                        <th>Minimum</th>
                        <th>Maximum</th>
                        <th>Average</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{this.state.min}</td>
                        <td>{this.state.max}</td>
                        <td>{this.state.avg}</td>
                      </tr>
                    </tbody>
                  </table>
              </div>
  
          </div>
        </div>
        
      </div>
    );
  }


}

export default App;
