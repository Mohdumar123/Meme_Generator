import React from 'react'

export default function Meme() {

  // const [imageSrc,setImageSrc] = React.useState("");

  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg"
  })

  const [allImage, setAllImage] = React.useState([]);

  React.useEffect(()=>{
    fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllImage(data.data.memes))
            console.log("data aa aya")
  },[])
 

  function memeImage() {
    const randomNumber = Math.floor(Math.random() * allImage.length);
    const url = allImage[randomNumber].url;
    console.log(url);

    setMeme((oldVal) => {
      return {
        ...oldVal,
        randomImage: url
      }
    });

  }

  function handlChange(event){
    const {name,value} = event.target 
    setMeme(oldVal=>{
      return {
        ...oldVal,
        [name]: value,

      }
     })
  }

  return (
    <div>
      <div className="meme-form">
        <div className="mb-3">
          <input className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" 
          placeholder='Top text' name="topText" value={meme.topText} onChange={handlChange} />
        </div>
        
        <div className="mb-3">
          <input className="form-control" id="exampleInputPassword1" placeholder='Bottom Text' 
          name='bottomText' value={meme.bottomText} onChange={handlChange} />
        </div>
        
        <button type="submit" className="btn" onClick={memeImage}>Get a New Meme Image</button>
   
        <div className="meme-container">
          <h2 className="meme--text top">{meme.topText}</h2>
          <h2 className="meme--text bottom">{meme.bottomText}</h2>
          <img id="meme_image" src={meme.randomImage} alt="" />
        </div>
      </div>



    </div>

  )
}
