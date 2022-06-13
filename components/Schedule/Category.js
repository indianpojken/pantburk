export default function Category({ title, position }) {
  return (
    <div className="category has-text-weight-bold">
      {title}
      <style jsx>
        {`
          .category {
            text-align: center;
            grid-row: categories;
            grid-column: ${1 + position};
          }
        `}
      </style>
    </div>
  )
}
