import React from 'react'
import WheelComponent from 'react-wheel-of-prizes'
import './index.css'
import slugify from 'slugify';

var randomColor = () => `#${Math.floor(Math.random()*16777215).toString(16)}`;


function App() {
  const [textVal, setTextVal] = React.useState('');
  const [count, setCount] = React.useState(0);

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

  const winningSegments = React.useMemo(() => {
    const arr = [];
    for (let sg of segments) {
      let slug = slugify(sg, {
        replacement: '-',  
        remove: undefined,
        lower: true,     
        strict: false,    
        locale: 'vi',      
        trim: true       
      })

      if (slug.includes('quynh')|| slug.includes('quyenh')) {
        arr.push(...(new Array(60).fill(sg)))
      } else {
        console.log(segments.length);
        const a = Math.round(40/(segments.length))
        console.log(a)
        arr.push(...(new Array(a).fill(sg)))
      }
    }

    arr.sort(function () {
      return Math.random() - 0.5;
    });
    console.log(arr);
    return arr;    
  },[segments])

  const winningSegment = React.useMemo(() => {
    for (let sg of segments) {
      let slug = slugify(sg, {
        replacement: '-',  
        remove: undefined,
        lower: true,     
        strict: false,    
        locale: 'vi',      
        trim: true       
      })

      if (slug.includes('quynh')|| slug.includes('quyenh')) {
        return sg
      }
    }
    
    return ''    
  },[segments, count])

  console.log(count)


  const onFinished = (winner) => {
    console.log(winningSegments[count]);
    console.log({winner})
    setCount(preCount => preCount+1);
  }

  return (
    <div className='container' >
      <div className='wheel'>
        <WheelComponent
          key={textVal}
          segments={segments}
          segColors={segColors}
          winningSegment={winningSegments[count]}
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
