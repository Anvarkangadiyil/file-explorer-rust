interface Props{
    type:String,
    color:String,
    space:String,

}



function Drive({type,color,space}:Props){
  return(
    <div className="drive-container mt-3  ms-3 p-1 ">
    <h4>{type}</h4>
    <div className="progress mb-2" role="progressbar" aria-label="Danger example" aria-valuenow="25%" aria-valuemin="0" aria-valuemax="100">
  <div className={"progress-bar bg-"+color} style={{width: "25%"}}>25%</div>
</div>
</div>
  );
}
export default Drive;