import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

/**
 * True only after the client has hydrated. Using useSyncExternalStore (server
 * snapshot false, client snapshot true) instead of a useEffect+setState pair
 * avoids the extra render-then-setState cascade the latter causes.
 */
export function useHasMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
