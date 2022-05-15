// interface CaseFile {
//   id: string;
//   name: string;
//   created_at: string;
//   updated_at: string;
//   consultee: {
//     member_id: string;
//     name: string;
//   };
// }

// function CaseFile({ caseFile } : { caseFile: CaseFile }) {
//   // Render post...
// }

// export async function getStaticPaths() {
//   // ...
// }

// // This also gets called at build time
// export async function getStaticProps({ params }) {
//   // params contains the post `id`.
//   // If the route is like /posts/1, then params.id is 1
//   console.log('Get Casefile from server here');

//   // Pass post data to the page via props
//   return { props: { CaseFile } }
// }

// export default CaseFile