import './Slider.css'
const SliderItem = ({imageSrc}) =>
{
    return( <div className="slider-item fade">
    <div className="slider-image">
      <img src={imageSrc} className="img-fluid" alt=""/>
    </div>
    <div className="container">
      <p className="slider-title">SUMMER 2024</p>
      <h2 className="slider-heading">Sleek designs,</h2>
      <h2 className="slider-heading">genuine leather, handcrafted - unparalleled quality</h2>
      <a href="#" className="btn-explore" >Explore Now</a>
    </div>
  </div>)
}
export default SliderItem