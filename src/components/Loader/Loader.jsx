import LoaderIMG from "../../images/loader.svg"
import "./Loader.css"

const Loader = () => {
  return (
    <div className="loader flex flex-c">
      <img src={LoaderIMG} alt="loader" />
    </div>
  )
}

export default Loader
