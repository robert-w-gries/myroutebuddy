// example wiki row: {{RELTaskRow|Achieve Your First Level 20|Reach level 20 in any skill|s=|other=|tier=easy|region=General|id=194}}

type Region = "General" | "Misthalin" | "Karamja";
type Points = 10 | 30;
type WikiTask = { id: `${number}`; region: Region; name: string; task: string; requirements: string; pts: Points };
type RouteTask = { id: `${number}`; custom?: boolean; task: string; };

const POINTS_TO_TIER_MAP = {
    10: 'easy',
    30: 'medium',
}

const createWikiTaskRow = (task: WikiTask) => `{{RELTaskRow|${task.name}|${task.task}|s=|other=|tier=${POINTS_TO_TIER_MAP[task.pts]}|region=${task.region}|id=${task.id}}}`;

const createCustomRow = (task: RouteTask) => `{{RELTaskRow||${task.task}|s=|other=|tier=|region=|id=}}`;

export function getWikiFormat(route: RouteTask[], wikiTasksData: Record<string, WikiTask>) {
    return route.map(task => {
        if ('custom' in task && task.custom) {
            return createCustomRow(task);
        } else {
            return createWikiTaskRow(wikiTasksData[task.id]);
        }
    }).join('\n');
}
