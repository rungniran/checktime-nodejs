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
		let nameLastName = $(this).attr('name-lastName')
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
})