// Get data from API using async and await function.
const getData = async ()=>{
    let data = await axios.get('https://sociepy.org/covid19-vaccination-subnational/data/api/v1/latest/country_by_iso/AR.json')
    return data
}

// Once the document is loaded, get the data and console it. For each element of the array 
document.addEventListener('DOMContentLoaded',async ()=>{
    console.log("Here!")
    const results = await getData()
    console.log(results)
    console.log(results.data)
    console.log(results.data.data) // array

    results.data.data.forEach(element => {
        //console.log(element)
        // console.log(element.region_name)
        // console.log(element.date)
        // console.log(element.total_vaccinations)
        // console.log(element.total_vaccinations_per_100)

        //let vaccineData = document.getElementsByClassName("datavaccine"); -- doesn't work
        /*let vaccineData = document.querySelector('.datavaccine');
        vaccineData.innerHTML += `
        <h4> Region: ${element.region_name} </h4>
        <ul> 
        <li> Latest Recorded Date: ${element.date} </li>
        <li> Total of Vaccinations: ${element.total_vaccinations} </li>
        <li> Total Vaccinations per 100 people: ${element.total_vaccinations_per_100} </li>
        </ul> `; */

    // This function allows me to get the data based on the iso number.
    function dataByRegionISO(region_iso) {
        const foundISOCode = results.data.data.find(region => region.region_iso == region_iso); // find the element with the name 'region_iso' in the array.
        return foundISOCode // return the value of region_iso
    }

    //This function allows me to display the data by ISO region into the html container.
    function displayDataOnContainer(dataAccordingISORegion) {
        const dataContainer = document.querySelector('#data-container')
        dataContainer.innerHTML = `
        <h4> Region: ${dataAccordingISORegion.region_name}. </h4>
        <ul> 
        <li> Last updated date: ${dataAccordingISORegion.date}. </li>
        <li> Total vaccinations: ${dataAccordingISORegion.total_vaccinations} persons received a vaccine. </li>
        </ul>`
    }

    // Allows me to understand the values of the classes 'region' in my html (pictures) - HTMLCollection array discovered.
    // An HTMLCollection object is an array-like list of elements (Una lista de elementos HTML en forma de matriz)
    // This HTMLCollection is returned by methods like getElementsByClassName.
    let pictureDetails = document.getElementsByClassName("region")
    //console.log(pictureDetails) // This returns an HTML collection of all the 'region' elements in the HTML document.
    
    // Transforms that HTML Collection into a normal Array.
    // Thanks to the spread syntax(...) allows me to include all elements from an object or array into a list of some kind.
    // In this case, the values of the HTMLCollection will be pushed into a new array.
    const listOfRegions = [...pictureDetails]

    //This function allows me to for each element of the previous array, everytime the elements are hovered, display the data.
    listOfRegions.forEach(element => {
        element.addEventListener('mouseover', function (event) { // mouseover event
            console.log("Hello")

            const getISOData = dataByRegionISO (event.target.id) // event.target is a reference to the object onto the event is going to work, in this case 'id'
            displayDataOnContainer(getISOData)
        })
    })
    })
})

            // const newDiv = document.createElement('div');
            // newDiv.className = "dataResults";
            // newDiv.innerHTML = `
            // // <h4> Region: ${dataAccordingISORegion.region_name}. </h4>
            // // <ul> 
            // // <li> Last updated date: ${dataAccordingISORegion.date}. </li>
            // // <li> Total vaccinations: ${dataAccordingISORegion.total_vaccinations} persons received a vaccine. </li>
            // // </ul>`
            // document.body.appendChild(newDiv)