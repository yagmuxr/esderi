import "./CampaignItem.css"
const CampaignItem = () =>
{
    return(
        <div className="campaign-item">
        <h3 className="campaign-title">Mother's Day <br />
          Is Around the Corner <br />
          </h3>
        <p className="campaign-desc">Make your loved ones with presents that made with love!</p>
        <a href="#" className="btn btn-primary">
          View All
          <i className="bi bi-arrow-right"></i>
        </a>
      </div>
    )
}
export default CampaignItem