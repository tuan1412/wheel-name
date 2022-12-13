import React from 'react'
import WheelComponent from 'react-wheel-of-prizes'
import './index.css'
import slugify from 'slugify';

var randomColor = () => `#${Math.floor(Math.random()*16777215).toString(16)}`;


function App() {
  const [textVal, setTextVal] = React.useState('');

  const segments = React.useMemo(() => {
    if (textVal == '') {
      return []
    }
    return textVal.split('\n').filter(Boolean)
  },[textVal])

  const segColors = React.useMemo(() => {
    let colors = []
    segments.forEach(sg => colors.push(randomColor()))
    return colors;
  }, [segments])

  const winningSegment = React.useMemo(() => {
    for (let sg of segments) {
      let slug = slugify(sg, {
        replacement: '-',  
        remove: undefined,
        lower: false,     
        strict: false,    
        locale: 'vi',      
        trim: true       
      })

      if (slug.includes('quynh')|| slug.includes('quyenh')) {
        return sg
      }
    }
    return ''    
  },[segments])

  console.log(winningSegment)


  const onFinished = (winner) => {
    console.log(winner)
  }

  return (
    <div className='container'>
      <div className='wheel'>
        <WheelComponent
          key={textVal}
          segments={segments}
          segColors={segColors}
          winningSegment={winningSegment}
          primaryColor='black'
          contrastColor='white'
          buttonText='Spin'
          isOnlyOnce={false}
          size={290}
          onFinished={(winner) => onFinished(winner)}
          upDuration={500}
          downDuration={1000}
          fontFamily='Arial'
        />
      </div>
      <div className='input-container'>
        <div className=''>
          <textarea placeholder='Nhập tên' value={textVal} onChange={e => setTextVal(e.target.value)} rows={40}/>
        </div>
        
      </div>


    </div>
  )
}

export default App
