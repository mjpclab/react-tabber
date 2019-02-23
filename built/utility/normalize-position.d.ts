import { Entry, TabItemPosition, NormalizedTabItemPosition } from '../type/tab';
declare const invalidNormalizedPosition: NormalizedTabItemPosition;
declare function normalizePosition(entries: Entry[], position: TabItemPosition): NormalizedTabItemPosition;
export { invalidNormalizedPosition, normalizePosition };
