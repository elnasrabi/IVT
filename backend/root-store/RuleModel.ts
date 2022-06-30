
import { flow, Instance, SnapshotOut, types } from "mobx-state-tree";
export const RuleRequestModel = types
import { Api } from "../services/api";
import {useEffect} from 'react'
const api = new Api();

/**
 * Model description here for TypeScript hints.
 */
export const RuleModel = types
.model("RuleRequestStore")
.props({
  isButtonLoading: false,
  isLoading: false,
  hasError: false,
  isEmptyList: true,
  isRuleSaved: true,

  isRuleDeleted: true,

  RuleRequestListData: types.optional(types.frozen(), []),
  RuleRequestList: types.optional(types.frozen(), []),
 
  UpdateRuleObj: types.optional(types.frozen(), {}),
  
  sync: false,
  responseSuccess: types.optional(types.boolean, false),
  
  getListData: types.optional(types.frozen(), []),
 
})
.views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
.actions(self => ({
 
  getRuleRequestList: function(
    authorization: any,
    getlistRequest: any,
  ) {
    self.isLoading = true;
    self.responseSuccess = true;
    try {
      useEffect(()=>{
        fetch('https://localhost:5000/articles',{
        
          headers : {
            'Content-Type':'application/json'
          }
        })
        .then(response => response.json())
        .then(response => this.setRuleData(response))
        .catch(error => console.log(error))
    
      },[])
        self.isButtonLoading = false;
    } catch (erro) {
      //showAlert("common.generalerror");
    }
    self.isLoading = false;
  },
 
  setRuleData(detail: any) {
    self.RuleRequestListData = detail;
  },
})) // eslint-disable-line @typescript-eslint/no-unused-vars

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.
 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 */



type RuleRequestStoreType = Instance<typeof RuleRequestModel>;
export interface RuleRequestStore extends RuleRequestStoreType {}
type RuleRequestStoreSnapshotType = SnapshotOut<typeof RuleRequestModel>;
export interface RuleRequestStoreSnapshot extends RuleRequestStoreSnapshotType {}
