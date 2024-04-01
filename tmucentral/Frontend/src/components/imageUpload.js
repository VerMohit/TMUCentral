function ImageUpload() {

    const[image,setImage]=useState("")
  function convertToBase64(e) {
    console.log(e);
    var reader = new FileReader(); 
    reader.readAsDataURL(e.target.files[0]); 
    reader.onload = () => {
      console.log(reader.result); // base64 encoded string
      setImage(reader.result);
    };
    reader.onerror = error => {
      console.log("Error: ", error);
    };
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner" style={{ width: "auto" }}>
        Let's Upload Image<br/>
        <input
          accept="image/*"
          type="file"
          onChange={convertToBase64}
        />
        {image=="" || image==null?"": <img width={100} height={100} src={image}/>}
      </div>
    </div>
  );
}

export default ImageUpload;
