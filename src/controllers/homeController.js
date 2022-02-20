let getHomePage = async (req, res) => {
    try {
        return res.render("homepage.ejs", {
            data: JSON.stringify("POLARBEAR")
        });
    } catch(e) {
        console.log(e);
    }
}

module.exports = {
    getHomePage
}
