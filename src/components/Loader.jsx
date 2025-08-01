export const Loader = ({showLoader}) => {
  return (
    <div className={`loaderMain ${!showLoader && 'hideLoader'}`}>
      <img src="/kerovit_logo.png" alt="" />
    </div>
  )
}
