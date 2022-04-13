import { RuleModel } from "./RuleModel";
import { Instance, SnapshotOut, types } from "mobx-state-tree";

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  ruleStore: types.optional(RuleModel, {}),
  
})


/**
 * The RootStore instance.
 */
export default RootStoreModel;

/**
 * The data of a RootStore.
 */

