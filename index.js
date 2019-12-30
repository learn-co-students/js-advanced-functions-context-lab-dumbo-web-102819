/* Your Code Here */

const createEmployeeRecord = (arr) => {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  }
  
  const createEmployeeRecords = (arr) => {
    return arr.map(emp => {
      return createEmployeeRecord(emp)
    });
  }

  const createTimeInEvent = function(date) {
    date = date.split(" ");
    
    let timeObj = {
      type: "TimeIn",
      hour: parseInt(date[1]),
      date: date[0]
    }
    
    this.timeInEvents.push(timeObj);
  
    return this;
  }

  const createTimeOutEvent = function(date) {
    date = date.split(" ");
    
    let timeObj = {
      type: "TimeOut",
      hour: parseInt(date[1]),
      date: date[0]
    }
    
    this.timeOutEvents.push(timeObj);
  
    return this;
  }

  const hoursWorkedOnDate = function (date) {
  
    let timeInEvents = this.timeInEvents;
    let timeOutEvents = this.timeOutEvents;
  
    for(let i = 0; i < timeInEvents.length; i++) {
      if(timeInEvents[i].date === date) {
        let hours = timeOutEvents[i].hour - timeInEvents[i].hour;
        return hours / 100;
      }
    }
  }

  const wagesEarnedOnDate = function(date) {
    let hours = hoursWorkedOnDate.call(this, date);
    return hours * this.payPerHour;
  }

  function calculatePayroll(employees) {
    let total = 0;
    for(let i = 0; i < employees.length; i++) {
      total += allWagesFor.call(employees[i])
    }
    return total;
  }

  function findEmployeeByFirstName(employees, name) {
    let firstEmp = employees.find(emp => {
      return emp.firstName === name;
    });
    return firstEmp;
  }



/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}