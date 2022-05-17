export default function Category({ title }) {
  return (
    <div className="category has-text-weight-bold">
      {title}
      <style jsx>{`
        .category {
          text-align: center;
          grid-row: categories;
        }
      `}</style>
    </div>
  )
}
