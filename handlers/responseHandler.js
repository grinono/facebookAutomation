// User Imports
const { findOne, insert } = require("../handlers/databaseHandler");

// Handle Response
module.exports.handleResponse = async (res) => {
  try {
    const req = await res.request();
    const resourceType = await req.resourceType();
    const resourceURL = await req.url();

    if (resourceType === "xhr" && resourceURL === "https://www.facebook.com/api/graphql/") {
      const json = JSON.parse((await res.buffer()).toString());

      if (json.data.hasOwnProperty("node")) {
        let edges = json.data.node.new_members.edges;
        edges = edges.map((edge) => {
          return { id: edge.node.id, name: edge.node.name, me: `https://www.messenger.com/t/${edge.node.id}` };
        });

        for (const edge of edges) {
          const match = await findOne({ id: edge.id });
          if (!match) await insert(edge);
        }
      }
    }
  } catch (e) {
    console.log({ type: e.type, message: e.message });
  }
};
