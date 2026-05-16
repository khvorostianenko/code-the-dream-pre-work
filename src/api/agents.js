import { fetchJson } from "./client.js";

const AGENT_FIELDS = "id,title,sort_title,alt_titles,is_artist,birth_date,death_date,description,ulan_id";

export function getAgent(id) {
    return fetchJson(`/agents/${id}`, {
        params: { fields: AGENT_FIELDS },
    });
}