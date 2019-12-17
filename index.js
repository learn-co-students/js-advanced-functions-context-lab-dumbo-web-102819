/* Your Code Here */

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

let createEmployeeRecord = function (arrayArg) {
    let newEmployee = {
        firstName: arrayArg[0],
        familyName: arrayArg[1],
        title: arrayArg[2], 
        payPerHour: arrayArg[3], 
        timeInEvents: [],
        timeOutEvents: []
    }
    return newEmployee
}

let createEmployeeRecords = function (arrayOfArrayArg) {
    let newEmployeeArray = []
    arrayOfArrayArg.forEach((arrayArg) => {
        let newEmployee = createEmployeeRecord(arrayArg)
        newEmployeeArray.push(newEmployee)
    })
    return newEmployeeArray
}

let createTimeInEvent = function (dateStamp) {
    let newObj = {
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    }
    this.timeInEvents.push(newObj)
    return this
}

let createTimeOutEvent = function (dateStamp) {
    let newObj = {
        type: "TimeOut",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    }
    this.timeOutEvents.push(newObj)
    return this
}

let hoursWorkedOnDate = function (dateString) {
    let clockIn = this.timeInEvents.find(element => element.date === dateString)
    let clockOut = this.timeOutEvents.find(element => element.date === dateString)
    let totalHours = (clockOut.hour - clockIn.hour) / 100
    return totalHours
    
}

let wagesEarnedOnDate = function (dateString) {
    let hoursW = hoursWorkedOnDate.call(this, dateString)
    let paypay = hoursW * this.payPerHour
    return paypay
}

let findEmployeeByFirstName = function (srcArray, firstName) {
    let foundE = srcArray.find(element => element.firstName === firstName)
    return foundE
}

let calculatePayroll = function (srcArray) {
    let tempTotal = 0
    srcArray.forEach((employeeT) => {
        tempTotal += allWagesFor.call(employeeT)
    })
    return tempTotal
}