export default function ResponsiveNavbar() {
    var nav = document.getElementById("myNavbar")
    if (nav !== null) {
        if (nav.className === "responsive") {
            nav.className = ""
        } else {
            nav.className = "responsive"
        }
    } else {
        alert("Cannot find appropriate id for Navbar")
    }
}