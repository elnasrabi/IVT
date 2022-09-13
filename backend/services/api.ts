import { ApiResponse, ApisauceInstance, create } from "apisauce";
// import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config";
import { getGeneralApiProblem } from "./api-problems";
import * as Types from "./api-types";
// const jsonxml = require("jsontoxml");



/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance;

  /**
   * Configurable options.
   */


  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */


  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  

  //-------Related Objects ------------Upload ------------------

 


  async getRule(authorization: string): Promise<Types.Rule> {
    try {
      let response = await fetch(
        `https://afs-web01:5051/api/getRules`,
      );
      let json = await response.json();
      return { kind: "ok", Rule: json };
    } catch (error) {
      return { kind: "bad-data" };
    }
  }

  

}
