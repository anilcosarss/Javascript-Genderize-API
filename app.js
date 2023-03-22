const url = `https://api.genderize.io?name=`;

const search = document.querySelector('input');
const button = document.querySelector('button');
const nameWord = document.querySelector('.name');
const genderImg = document.querySelector('img');
const genderType = document.querySelector('.gender-type')
const probablity = document.querySelector('.ratio')
const genderBody = document.querySelector('.gender-body');
const bodyContainer = document.querySelector('.body-container')
const form = document.querySelector('form');

button.addEventListener('click', (e) => {
    

    let word = search.value
    fetch(`${url}${word}`).then(response => response.json()).then(result => {

        if(word==''){
            alert('Please type a name')
        } 
        else{
            if (/\d/.test(word) == true || word.match(/!@#%&()_=/)){
                const newElement=  document.createElement('h2');
                    newElement.classList = 'newElement';
                    const textNode = document.createTextNode( `"${word}"includes a number! Please type a name without number`)
                    newElement.appendChild(textNode);
                    bodyContainer.insertBefore(newElement,genderBody);
                    newElement.style.padding='10px 20px'
                    newElement.style.borderRadius='10px'
                    genderBody.classList='d-none';
    
    
                    setTimeout(alertDelete, 2000);
                    function alertDelete () {
                        newElement.style.display='none';
                    }
            }else {
                if (result.probability < 0.20 ) {
               
                    const newElement=  document.createElement('h2');
                    newElement.classList = 'newElement';
                    const textNode = document.createTextNode( `"${word}"is not a name!`)
                    newElement.appendChild(textNode);
                    bodyContainer.insertBefore(newElement,genderBody);
                    newElement.style.padding='10px 20px'
                    newElement.style.borderRadius='10px'
                    genderBody.classList='d-none';
    
    
                    setTimeout(alertDelete, 2000);
                    function alertDelete () {
                        newElement.style.display='none';
                    }
                }
                
                
                else {
                    genderBody.classList='gender-body w-25 mt-5  py-5 px-3 d-flex flex-column align-items-center  rounded-3';
                if(result.gender=='female'){
                
                    nameWord.innerText= result.name;
                    nameWord.style.background='rgb(241, 106, 128)'
                    nameWord.style.padding='10px 20px'
                    nameWord.style.border='1px solid white'
        
                    
                    genderType.innerText= result.gender;
                    genderImg.src='./FemalePink.png'
                    probablity.innerHTML= `Probability:${result.probability}` ;
                    genderBody.style.background= 'linear-gradient(to right , rgb(224, 95, 117) ,rgb(215, 43, 149))';
        
                } else {
                    nameWord.innerText= result.name;
                    nameWord.style.background='rgb(94, 94, 228)'
                    nameWord.style.padding='10px 20px'
                    nameWord.style.border='1px solid white'
        
                    genderType.innerText= result.gender;
                    genderImg.src='./—Pngtree—vector male sign icon_4184181.png'
                    probablity.innerHTML= `Probability:${result.probability}` ;
                    genderBody.style.background= 'linear-gradient(to right , rgb(70, 63, 201) ,rgb(40, 43, 102))';
                    
                }
            }
            }
        } 
        
  
    });
    e.preventDefault();
search.value='';

})
