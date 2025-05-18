import SubscribeForm from './components/Subscribe Form/SubscribeForm'
import './App.css'

function App() {
  const header = 
    "Get the finest curated abstracts delivered weekly to your inbox";
  const conditions = [{
    id: 0,
    message: "Exlusive access to new abstract images and collections",
  },
  {
    id: 1,
    message: "Unlock special promotions only for subscribers",
  },
  {
    id: 2,
    message: "Regular doses of artistic inspiration"
  }]

  return (
    <div className='app'>
      <SubscribeForm 
        header={ header }
        conditions={ conditions }
        />
    </div>
  )
}

export default App
