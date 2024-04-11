import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [advisorsData,setAdvisorsData]=useState();
  const [oneTimeAdviserData,setOneTimeAdviserData]=useState(null)
  useEffect(()=>{
      try{
        const url = 'https://demo2255213.mockable.io/listings';
        axios.get(url)
          .then(response => {
            setAdvisorsData(response?.data?.data)
            setOneTimeAdviserData(response?.data?.data)
            // fetchCall(response?.data?.data)
          })
          .catch(error => {
            console.error('Error making get request:', error);
          });
      }catch(ex){
        console.log(ex)
      }
  },[])


    useEffect(()=>{
      if(oneTimeAdviserData){
        const intervalData=oneTimeAdviserData 
        console.log()
        intervalData.forEach(element => {
          setInterval(()=>{
            axios.get(`https://demo2255213.mockable.io/advisor-availability?advisorId=${element?.id}`).then(response=>{
              const newArray = intervalData?.map(item => {
                if (item.id === element?.id) {
                  return { ...item, ...response?.data};
                }
                return item;
              });
              setAdvisorsData(newArray)
            }).catch(error=>{
              console.error('Error making get request:', error);
            })
        },30000)
        }); 
      }
    },[oneTimeAdviserData])

  return (<>
          <h2 className='h2-div'>Advisor Availability</h2>
          <div className='top-div-of-adviser'>
          {advisorsData?.map((item,index)=><div  className='adviser-card-div' key={`adviser-${index}`} >
            <div className='image-name-top-div'> 
              <div><img  className ='image-div'src={item?.pictureUrl} alt='image_icon' /></div>
              <div className='name-div'>{item?.name}</div>
              </div>
              <div>
                <div className='amount-div'>{item?.price}</div>
                <div >
                  <button className='button-div' style={{marginBottom:'5px', backgroundColor:item?.['call-availability']==='offline'?'#A9A9A9':'#076D64'}} disabled={item?.['call-availability']==='offline'?true:false}> CALL NOW</button>
                </div>
                <div > <button className='button-div' style={{backgroundColor:item?.['chat-availability']==='offline'?'#A9A9A9':'#076D64'}} disabled={item?.['chat-availability']==='offline'?true:false}>CHAT NOw</button></div>
              </div>

          </div>)
          }
        </div>
        
        </>
   
  )
}

export default App
