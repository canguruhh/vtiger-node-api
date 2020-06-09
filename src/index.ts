import * as request from "request-promise"
import { MD5 } from "crypto-js"
import { CRMObject } from "./types/crm.types";

export class Connection {

    private session: string
    userId: string

    constructor(private url, private username, private access_key, private on_failure = null) { }

    async login() {
        const challengeToken = (await this.getChallenge()).token;
        let challenge = MD5(challengeToken + this.access_key).toString();
        const result = await this._post({
            operation: 'login',
            username: this.username,
            accessKey: challenge
        });
        this.session = result.sessionName;
        this.userId = result.userId;
        return result;
    }

    private getChallenge() {
        return this._get({
            operation: 'getchallenge',
            username: this.username,
        })
    }

    update(element: CRMObject){
        return this._post({
            operation: 'update',
            sessionName: this.session,
            element: JSON.stringify(element),
        })
    }

    delete(id: string){
        return this._post({
            operation: 'delete',
            sessionName: this.session,
            id: id
        })
    }

    create(moduleName, element){
        element.assigned_user_id = element.assigned_user_id || this.userId
        return this._post({
            operation: 'create',
            sessionName: this.session,
            element: JSON.stringify(element),
            elementType: moduleName,
        })
    }

    retrieve(id: string){
        return this._get({
            operation: 'retrieve',
            sessionName: this.session,
            id: id,
        })
    }

    query(query: string){
        return this._get({
            operation: 'query',
            sessionName: this.session,
            query: query
        })
    }

    logout(){
        return this._post({
            operation: 'logout',
            sessionName: this.session
        })
    }

    listTypes(){
        return this._get({
            operation: 'listtypes',
            sessionName: this.session
        })
    }

    describe(elementType){
        return this._get({
            operation: 'describe',
            sessionName: this.session,
            elementType: elementType
        })
    }

    retrieveRelated(id, relatedLabel, relatedType){
        return this._get({
            operation: 'retrieve_related',
            sessionName: this.session,
            id: id,
            relatedLabel: relatedLabel,
            relatedType: relatedType
        })
    }

    relatedTypes(elementType){
        return this._get({
            operation: 'relatedtypes',
            sessionName: this.session,
            elementType: elementType
        })
    }

    queryRelated(moduleName: string, id: string, relatedLabel: string){
        return this._get({
            operation: 'query_related',
            sessionName: this.session,
            query: `SELECT * FROM ${moduleName}`,
            id: id,
            relatedLabel: relatedLabel
        })
    }

    deleteRelated(sourceId, relatedId){
        return this._post({
            operation: 'delete_related',
            sessionName: this.session,
            sourceRecordId: sourceId,
            relatedRecordId: relatedId,
        })
    }

    addRelated(sourceRecordId, relatedRecordId, relationIdLabel){
        return this._post({
            operation: 'add_related',
            sessionName: this.session,
            sourceRecordId: sourceRecordId,
            relatedRecordId: relatedRecordId,
            relationIdLabel: relationIdLabel
        })
    }

    private async _post(params) {
        const res = await request.post({
            uri: this.url + '/webservice.php',
            json: true,
            formData: params,
        });
        if (!res.success) {
            if(!!this.on_failure) {
                return this.on_failure(res, params)
            } else {
                console.error(res.error.message);
                throw Error(res.error.code);
            }
        }
        return res.result;
    }

    private async _get(params) {
        const res = await request.get({
            uri: this.url + '/webservice.php ',
            qs: params,
            json: true,
        });
        if (!res.success) {
            if(!!this.on_failure) {
                return this.on_failure(res, params)
            } else {
                console.error(res.error.message);
                throw Error(res.error.code);
            }
        }
        return res.result;
    }

}
