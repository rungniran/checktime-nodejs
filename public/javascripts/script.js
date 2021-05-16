function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("sideMenu").style.marginLeft = "0px";
}
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("sideMenu").style.marginLeft = "-250px";

}

$(document).ready(function(){
	$('.detail').click(function(){
		let nameLastName = $(this).attr('name-LastName')
		let numberPersonnel = $(this).attr('numberPersonnel')
		let position = $(this).attr('position')
		let dayMonthYear = $(this).attr('day-month-year')
		let T = $(this).attr('T')
        console.log(name)

        $("#nameLastName").val(nameLastName)
        $("#numberPersonnel").val(numberPersonnel)
        $("#position").val(position)
        $("#dayMonthYear").val(dayMonthYear)
        $("#T").val(T)
	    $("#fomrDetail").modal("show")
    })
    $('.detailyear').click(function(){
        let nameLastName = $(this).attr('name-Lastname')
        let year = $(this).attr('year')
        let month = $(this).attr('month')
        let countmonth = $(this).attr('countmonth')
        let pay = $(this).attr('pay')
        console.log(nameLastName)
        
        $("#nameLastName_Year").val(nameLastName)
        $("#year").val(year)
        $("#month").val(month)
        $("#countmonth").val(countmonth)
        $("#pay").val(pay)

        $("#fomrDetailMonth").modal("show")
    })
})

console.log(window.location.pathname)
var coler = "#ffffff5a"
if(window.location.pathname === "/dashboard"){
    let dashboard = document.getElementById("dashboard")
    dashboard.style.backgroundColor = coler
    dashboard.style.borderRadius = "3px"
}
else if(window.location.pathname === "/personnel"){
    let personnel = document.getElementById("personnel")
    personnel.style.backgroundColor = coler
    personnel.style.borderRadius = "3px"
}
else if(window.location.pathname === "/month"){
    let month = document.getElementById("month")
    month.style.backgroundColor = coler
    month.style.borderRadius = "3px"
}
else if(window.location.pathname === "/year"){
    let year = document.getElementById("year")
    year.style.backgroundColor = coler
    year.style.borderRadius = "3px"
}
else if(window.location.pathname === "/search"){
    let search = document.getElementById("search")
    search.style.backgroundColor = coler
    search.style.borderRadius = "3px"
}
else if(window.location.pathname === "/inform"){
    let inform = document.getElementById("inform")
    inform.style.backgroundColor = coler
    inform.style.borderRadius = "3px"
}
