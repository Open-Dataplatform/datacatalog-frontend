export declare module Components {
    export module Schemas {
        export interface IAdSearchResult {
            id?: string | null;
            displayName?: string | null;
            type?: string | null;
        }
        export interface IAddDatasetAccessMemberRequestDto {
            memberId?: string; // uuid
        }
        export interface ICategory {
            name?: string | null;
            colour?: string | null;
            imageUri?: string | null; // uri
            version?: number; // int32
            originEnvironment?: string | null;
            originDeleted?: boolean;
            id?: string; // uuid
            modifiedDate?: string; // date-time
            createdDate?: string; // date-time
        }
        export interface ICategoryColour {
            colour?: string | null;
        }
        export interface ICategoryCreateRequest {
            name?: string | null;
            colour?: string | null;
            imageUri?: string | null; // uri
        }
        export interface ICategoryUpdateRequest {
            id?: string; // uuid
            name?: string | null;
            colour?: string | null;
            imageUri?: string | null; // uri
        }
        export type IConfidentiality = 0 | 1 | 2 | 3; // int32
        export interface IDataAccessEntry {
            id?: string | null;
            name?: string | null;
            memberType?: string | null;
        }
        export interface IDataContract {
            datasetId?: string; // uuid
            dataSourceId?: string; // uuid
            datasetContainer?: string | null;
            datasetLocation?: string | null;
            datasetStatus?: IDatasetStatus; // int32
            version?: number; // int32
            originEnvironment?: string | null;
            originDeleted?: boolean;
            id?: string; // uuid
            modifiedDate?: string; // date-time
            createdDate?: string; // date-time
        }
        export interface IDataContractCreateRequest {
            datasetId?: string; // uuid
            dataSourceId?: string; // uuid
        }
        export interface IDataContractUpdateRequest {
            id?: string; // uuid
            datasetId?: string; // uuid
            dataSourceId?: string; // uuid
        }
        export interface IDataField {
            name?: string | null;
            type?: string | null;
            description?: string | null;
            format?: string | null;
            validation?: string | null;
            id?: string; // uuid
            modifiedDate?: string; // date-time
            createdDate?: string; // date-time
        }
        export interface IDataFieldUpsertRequest {
            name?: string | null;
            type?: string | null;
            description?: string | null;
            format?: string | null;
            validation?: string | null;
            id?: string | null; // uuid
        }
        export interface IDataSource {
            name?: string | null;
            description?: string | null;
            contactInfo?: string | null;
            sourceType?: ISourceType; // int32
            version?: number; // int32
            originEnvironment?: string | null;
            originDeleted?: boolean;
            id?: string; // uuid
            modifiedDate?: string; // date-time
            createdDate?: string; // date-time
        }
        export interface IDataSourceCreateRequest {
            name?: string | null;
            description?: string | null;
            contactInfo?: string | null;
            sourceType?: ISourceType; // int32
        }
        export interface IDataSourceUpdateRequest {
            id?: string; // uuid
            name?: string | null;
            description?: string | null;
            contactInfo?: string | null;
            sourceType?: ISourceType; // int32
        }
        export interface IDataset {
            memberId?: string | null; // uuid
            name?: string | null;
            description?: string | null;
            slaDescription?: string | null;
            slaLink?: string | null;
            owner?: string | null;
            status?: IDatasetStatus; // int32
            confidentiality?: IConfidentiality; // int32
            refinementLevel?: IRefinementLevel; // int32
            location?: string | null;
            contact?: IMemberGroup;
            frequency?: IDuration;
            resolution?: IDuration;
            sourceTransformation?: ITransformation;
            hierarchy?: IHierarchy;
            dataFields?: IDataField[] | null;
            categories?: ICategory[] | null;
            datasetChangeLogs?: IDatasetChangeLog[] | null;
            dataSources?: IDataSource[] | null;
            provisionStatus?: IProvisionDatasetStatusEnum; // int32
            version?: number; // int32
            originEnvironment?: string | null;
            originDeleted?: boolean;
            id?: string; // uuid
            modifiedDate?: string; // date-time
            createdDate?: string; // date-time
        }
        export interface IDatasetAccessList {
            readAccessList?: IDataAccessEntry[] | null;
            writeAccessList?: IDataAccessEntry[] | null;
        }
        export interface IDatasetChangeLog {
            member?: IMember;
            createdDate?: string; // date-time
        }
        export interface IDatasetCreateRequest {
            name?: string | null;
            description?: string | null;
            slaDescription?: string | null;
            slaLink?: string | null;
            owner?: string | null;
            status?: IDatasetStatus; // int32
            confidentiality?: IConfidentiality; // int32
            refinementLevel?: IRefinementLevel; // int32
            location?: string | null;
            contact?: IGuidId;
            hierarchy?: IGuidId;
            categories?: IGuidId[] | null;
            dataSources?: IGuidId[] | null;
            frequency?: IDurationUpsertRequest;
            resolution?: IDurationUpsertRequest;
            sourceTransformation?: ISourceTransformationUpsertRequest;
            dataFields?: IDataFieldUpsertRequest[] | null;
        }
        export interface IDatasetGroup {
            memberId?: string | null; // uuid
            name?: string | null;
            description?: string | null;
            datasets?: IDatasetSummary[] | null;
            id?: string; // uuid
            modifiedDate?: string; // date-time
            createdDate?: string; // date-time
        }
        export interface IDatasetGroupCreateRequest {
            name?: string | null;
            description?: string | null;
            datasets?: IGuidId[] | null;
        }
        export interface IDatasetGroupUpdateRequest {
            memberId?: string; // uuid
            name?: string | null;
            description?: string | null;
            datasets?: IGuidId[] | null;
            id?: string; // uuid
        }
        export interface IDatasetLocation {
            location?: string | null;
        }
        export interface IDatasetLocationRequest {
            name?: string | null;
            hierarchy?: INullableGuidId;
        }
        export interface IDatasetPredictiveSearch {
            name?: string | null;
            confidentiality?: IConfidentiality; // int32
            categories?: ICategoryColour[] | null;
            id?: string; // uuid
        }
        export interface IDatasetSearchByCategoryRequest {
            categoryId?: string; // uuid
            sortType?: ISortType; // int32
            take?: number; // int32
            pageSize?: number; // int32
            pageIndex?: number; // int32
        }
        export interface IDatasetSearchByTermRequest {
            searchTerm?: string | null;
            sortType?: ISortType; // int32
            take?: number; // int32
            pageSize?: number; // int32
            pageIndex?: number; // int32
        }
        export type IDatasetStatus = 0 | 1 | 2; // int32
        export interface IDatasetSummary {
            name?: string | null;
            description?: string | null;
            status?: IDatasetStatus; // int32
            confidentiality?: IConfidentiality; // int32
            categories?: ICategory[] | null;
            id?: string; // uuid
            modifiedDate?: string; // date-time
            createdDate?: string; // date-time
        }
        export interface IDatasetUpdateRequest {
            id?: string; // uuid
            name?: string | null;
            description?: string | null;
            slaDescription?: string | null;
            slaLink?: string | null;
            owner?: string | null;
            status?: IDatasetStatus; // int32
            confidentiality?: IConfidentiality; // int32
            refinementLevel?: IRefinementLevel; // int32
            location?: string | null;
            contact?: IGuidId;
            hierarchy?: IGuidId;
            categories?: IGuidId[] | null;
            dataSources?: IGuidId[] | null;
            frequency?: IDurationUpsertRequest;
            resolution?: IDurationUpsertRequest;
            sourceTransformation?: ISourceTransformationUpsertRequest;
            dataFields?: IDataFieldUpsertRequest[] | null;
        }
        export interface IDuration {
            code?: string | null;
            description?: string | null;
            id?: string; // uuid
            modifiedDate?: string; // date-time
            createdDate?: string; // date-time
        }
        export interface IDurationCreateRequest {
            code?: string | null;
            description?: string | null;
        }
        export interface IDurationUpdateRequest {
            id?: string; // uuid
            code?: string | null;
            description?: string | null;
        }
        export interface IDurationUpsertRequest {
            code?: string | null;
            description?: string | null;
            id?: string | null; // uuid
        }
        export interface IEnum {
            id?: number; // int32
            description?: string | null;
        }
        export interface IGuidId {
            id?: string; // uuid
        }
        export interface IHierarchy {
            name?: string | null;
            description?: string | null;
            parentHierarchyId?: string | null; // uuid
            childHierarchies?: IHierarchy[] | null;
            id?: string; // uuid
            modifiedDate?: string; // date-time
            createdDate?: string; // date-time
        }
        export interface IHierarchyCreateRequest {
            name?: string | null;
            description?: string | null;
            parentHierarchyId?: string | null; // uuid
        }
        export interface IHierarchyUpdateRequest {
            id?: string; // uuid
            name?: string | null;
            description?: string | null;
            parentHierarchyId?: string | null; // uuid
        }
        export interface ILineageDataset {
            sourceTransformations?: ILineageTransformation[] | null;
            sinkTransformations?: ILineageTransformation[] | null;
            name?: string | null;
            description?: string | null;
            status?: IDatasetStatus; // int32
            confidentiality?: IConfidentiality; // int32
            categories?: ICategory[] | null;
            id?: string; // uuid
            modifiedDate?: string; // date-time
            createdDate?: string; // date-time
        }
        export interface ILineageTransformation {
            shortDescription?: string | null;
            description?: string | null;
            datasets?: ILineageDataset[] | null;
            id?: string; // uuid
            modifiedDate?: string; // date-time
            createdDate?: string; // date-time
        }
        export interface IMember {
            name?: string | null;
            email?: string | null;
            memberRole?: IRole; // int32
            id?: string; // uuid
            modifiedDate?: string; // date-time
            createdDate?: string; // date-time
        }
        export interface IMemberGroup {
            name?: string | null;
            description?: string | null;
            email?: string | null;
            members?: IGuidId[] | null;
            datasets?: IGuidId[] | null;
            id?: string; // uuid
            modifiedDate?: string; // date-time
            createdDate?: string; // date-time
        }
        export interface IMemberGroupCreateRequest {
            name?: string | null;
            description?: string | null;
            email?: string | null;
            members?: IGuidId[] | null;
        }
        export interface INullableGuidId {
            id?: string | null; // uuid
        }
        export interface IProblemDetails {
            [name: string]: {
            };
            type?: string | null;
            title?: string | null;
            status?: null | number; // int32
            detail?: string | null;
            instance?: string | null;
        }
        export type IProvisionDatasetStatusEnum = 0 | 1 | 2; // int32
        export type IRefinementLevel = 0 | 1 | 2; // int32
        export type IRole = 0 | 1 | 2; // int32
        export type ISortType = 0 | 1 | 2 | 3 | 4 | 5 | 6; // int32
        export interface ISourceTransformationUpsertRequest {
            id?: string | null; // uuid
            shortDescription?: string | null;
            description?: string | null;
            sourceDatasets?: IGuidId[] | null;
        }
        export type ISourceType = 0 | 1 | 2; // int32
        export interface ITransformation {
            shortDescription?: string | null;
            description?: string | null;
            sourceDatasets?: IDatasetSummary[] | null;
            sinkDatasets?: IDatasetSummary[] | null;
            id?: string; // uuid
            modifiedDate?: string; // date-time
            createdDate?: string; // date-time
        }
        export interface ITransformationCreateRequest {
            shortDescription?: string | null;
            description?: string | null;
            sourceDatasets?: IGuidId[] | null;
            sinkDatasets?: IGuidId[] | null;
        }
        export interface ITransformationUpdateRequest {
            shortDescription?: string | null;
            description?: string | null;
            sourceDatasets?: IGuidId[] | null;
            sinkDatasets?: IGuidId[] | null;
            id?: string; // uuid
        }
        export interface IUser {
            name?: string | null;
            roles?: string[] | null;
        }
    }
}
declare namespace Paths {
    namespace ApiCategory {
        namespace Delete {
            export interface IQueryParameters {
                id?: Parameters.IId; // uuid
            }
            namespace Parameters {
                /**
                 * The id of the category to delete
                 */
                export type IId = string; // uuid
            }
            namespace Responses {
                export interface I200 {
                }
            }
        }
        namespace Get {
            export interface IQueryParameters {
                includeEmpty?: Parameters.IIncludeEmpty;
            }
            namespace Parameters {
                /**
                 * If set to true the returned category list will include categories without datasets
                 */
                export type IIncludeEmpty = boolean | null;
            }
            namespace Responses {
                export interface I200 {
                }
                export type I401 = Components.Schemas.IProblemDetails;
                export interface I500 {
                }
            }
        }
        namespace Post {
            export type IRequestBody = Components.Schemas.ICategoryCreateRequest;
            namespace Responses {
                export interface I200 {
                }
            }
        }
        namespace Put {
            export type IRequestBody = Components.Schemas.ICategoryUpdateRequest;
            namespace Responses {
                export interface I200 {
                }
            }
        }
    }
    namespace ApiCategory$Id {
        namespace Get {
            export interface IPathParameters {
                id: Parameters.IId; // uuid
            }
            namespace Parameters {
                /**
                 * The id of the category to get
                 */
                export type IId = string; // uuid
            }
            namespace Responses {
                export interface I200 {
                }
                export type I401 = Components.Schemas.IProblemDetails;
                export interface I500 {
                }
            }
        }
    }
    namespace ApiDataContract {
        namespace Delete {
            export interface IQueryParameters {
                id?: Parameters.IId; // uuid
            }
            namespace Parameters {
                /**
                 * The id of the data contract to delete
                 */
                export type IId = string; // uuid
            }
            namespace Responses {
                export interface I200 {
                }
            }
        }
        namespace Get {
            namespace Responses {
                export interface I200 {
                }
            }
        }
        namespace Post {
            export type IRequestBody = Components.Schemas.IDataContractCreateRequest;
            namespace Responses {
                export interface I200 {
                }
            }
        }
        namespace Put {
            export type IRequestBody = Components.Schemas.IDataContractUpdateRequest;
            namespace Responses {
                export interface I200 {
                }
            }
        }
    }
    namespace ApiDataContract$Id {
        namespace Get {
            export interface IPathParameters {
                id: Parameters.IId; // uuid
            }
            namespace Parameters {
                /**
                 * The id of the data contract to get
                 */
                export type IId = string; // uuid
            }
            namespace Responses {
                export interface I200 {
                }
                export type I401 = Components.Schemas.IProblemDetails;
                export interface I500 {
                }
            }
        }
    }
    namespace ApiDataContractBydataset$Id {
        namespace Get {
            export interface IPathParameters {
                id: Parameters.IId; // uuid
            }
            namespace Parameters {
                /**
                 * The id of the dataset to get data contracts for
                 */
                export type IId = string; // uuid
            }
            namespace Responses {
                export type I200 = Components.Schemas.IDataContract[];
                export type I401 = Components.Schemas.IProblemDetails;
                export interface I500 {
                }
            }
        }
    }
    namespace ApiDataContractBydatasource$Id {
        namespace Get {
            export interface IPathParameters {
                id: Parameters.IId; // uuid
            }
            namespace Parameters {
                /**
                 * The id of the data source to get data contracts for
                 */
                export type IId = string; // uuid
            }
            namespace Responses {
                export type I200 = Components.Schemas.IDataContract[];
                export type I401 = Components.Schemas.IProblemDetails;
                export interface I500 {
                }
            }
        }
    }
    namespace ApiDataSource {
        namespace Delete {
            export interface IQueryParameters {
                id?: Parameters.IId; // uuid
            }
            namespace Parameters {
                /**
                 * The id of the data source to delete
                 */
                export type IId = string; // uuid
            }
            namespace Responses {
                export interface I200 {
                }
            }
        }
        namespace Get {
            namespace Responses {
                export interface I200 {
                }
            }
        }
        namespace Post {
            export type IRequestBody = Components.Schemas.IDataSourceCreateRequest;
            namespace Responses {
                export interface I200 {
                }
            }
        }
        namespace Put {
            export type IRequestBody = Components.Schemas.IDataSourceUpdateRequest;
            namespace Responses {
                export interface I200 {
                }
            }
        }
    }
    namespace ApiDataSource$Id {
        namespace Get {
            export interface IPathParameters {
                id: Parameters.IId; // uuid
            }
            namespace Parameters {
                /**
                 * The id of the data source to get
                 */
                export type IId = string; // uuid
            }
            namespace Responses {
                export interface I200 {
                }
                export type I401 = Components.Schemas.IProblemDetails;
                export interface I500 {
                }
            }
        }
    }
    namespace ApiDataset {
        namespace Delete {
            export interface IQueryParameters {
                request?: Parameters.IRequest; // uuid
            }
            namespace Parameters {
                /**
                 * The id of the dataset to delete
                 */
                export type IRequest = string; // uuid
            }
            namespace Responses {
                export interface I200 {
                }
            }
        }
        namespace Get {
            namespace Responses {
                export type I200 = Components.Schemas.IDatasetSummary[];
            }
        }
        namespace Post {
            export type IRequestBody = Components.Schemas.IDatasetCreateRequest;
            namespace Responses {
                export type I200 = Components.Schemas.IDataset;
            }
        }
        namespace Put {
            export type IRequestBody = Components.Schemas.IDatasetUpdateRequest;
            namespace Responses {
                export type I200 = Components.Schemas.IDataset;
            }
        }
    }
    namespace ApiDataset$DatasetIdAccess$MemberIdRead {
        namespace Delete {
            export interface IPathParameters {
                datasetId: Parameters.IDatasetId; // uuid
                memberId: Parameters.IMemberId; // uuid
            }
            namespace Parameters {
                export type IDatasetId = string; // uuid
                export type IMemberId = string; // uuid
            }
            namespace Responses {
                export interface I200 {
                }
            }
        }
    }
    namespace ApiDataset$DatasetIdAccess$MemberIdWrite {
        namespace Delete {
            export interface IPathParameters {
                datasetId: Parameters.IDatasetId; // uuid
                memberId: Parameters.IMemberId; // uuid
            }
            namespace Parameters {
                export type IDatasetId = string; // uuid
                export type IMemberId = string; // uuid
            }
            namespace Responses {
                export interface I200 {
                }
            }
        }
    }
    namespace ApiDataset$DatasetIdAccessRead {
        namespace Post {
            export interface IPathParameters {
                datasetId: Parameters.IDatasetId; // uuid
            }
            export type IRequestBody = Components.Schemas.IAddDatasetAccessMemberRequestDto;
            namespace Parameters {
                export type IDatasetId = string; // uuid
            }
            namespace Responses {
                export type I200 = Components.Schemas.IDataAccessEntry;
            }
        }
    }
    namespace ApiDataset$DatasetIdAccessWrite {
        namespace Post {
            export interface IPathParameters {
                datasetId: Parameters.IDatasetId; // uuid
            }
            export type IRequestBody = Components.Schemas.IAddDatasetAccessMemberRequestDto;
            namespace Parameters {
                export type IDatasetId = string; // uuid
            }
            namespace Responses {
                export type I200 = Components.Schemas.IDataAccessEntry;
            }
        }
    }
    namespace ApiDataset$Id {
        namespace Get {
            export interface IPathParameters {
                id: Parameters.IId; // uuid
            }
            namespace Parameters {
                /**
                 * The id of the dataset to get
                 */
                export type IId = string; // uuid
            }
            namespace Responses {
                export type I200 = Components.Schemas.IDataset;
            }
        }
    }
    namespace ApiDataset$IdAccess {
        namespace Get {
            export interface IPathParameters {
                id: Parameters.IId; // uuid
            }
            namespace Parameters {
                /**
                 * The id of the dataset to get the access list for
                 */
                export type IId = string; // uuid
            }
            namespace Responses {
                export type I200 = Components.Schemas.IDatasetAccessList;
                export type I401 = Components.Schemas.IProblemDetails;
                export interface I500 {
                }
            }
        }
    }
    namespace ApiDatasetAccess {
        namespace Get {
            export interface IQueryParameters {
                search?: Parameters.ISearch;
            }
            namespace Parameters {
                export type ISearch = string | null;
            }
            namespace Responses {
                export type I200 = Components.Schemas.IAdSearchResult[];
            }
        }
    }
    namespace ApiDatasetGroup {
        namespace Delete {
            export interface IQueryParameters {
                id?: Parameters.IId; // uuid
            }
            namespace Parameters {
                /**
                 * The id of the category to delete
                 */
                export type IId = string; // uuid
            }
            namespace Responses {
                export interface I200 {
                }
            }
        }
        namespace Get {
            namespace Responses {
                export interface I200 {
                }
            }
        }
        namespace Post {
            export type IRequestBody = Components.Schemas.IDatasetGroupCreateRequest;
            namespace Responses {
                export interface I200 {
                }
            }
        }
        namespace Put {
            export type IRequestBody = Components.Schemas.IDatasetGroupUpdateRequest;
            namespace Responses {
                export interface I200 {
                }
            }
        }
    }
    namespace ApiDatasetGroup$Id {
        namespace Get {
            export interface IPathParameters {
                id: Parameters.IId; // uuid
            }
            namespace Parameters {
                /**
                 * The id of the dataset group to get
                 */
                export type IId = string; // uuid
            }
            namespace Responses {
                export type I200 = Components.Schemas.IDatasetGroup;
                export type I401 = Components.Schemas.IProblemDetails;
                export interface I500 {
                }
            }
        }
    }
    namespace ApiDatasetLineage$Id {
        namespace Get {
            export interface IPathParameters {
                id: Parameters.IId; // uuid
            }
            namespace Parameters {
                /**
                 * The id of the dataset
                 */
                export type IId = string; // uuid
            }
            namespace Responses {
                export type I200 = Components.Schemas.ILineageDataset;
                export type I401 = Components.Schemas.IProblemDetails;
                export interface I500 {
                }
            }
        }
    }
    namespace ApiDatasetLocation {
        namespace Post {
            export type IRequestBody = Components.Schemas.IDatasetLocationRequest;
            namespace Responses {
                export type I200 = Components.Schemas.IDatasetLocation;
                export type I401 = Components.Schemas.IProblemDetails;
                export interface I500 {
                }
            }
        }
    }
    namespace ApiDatasetPromote$Id {
        namespace Post {
            export interface IPathParameters {
                id: Parameters.IId; // uuid
            }
            namespace Parameters {
                /**
                 * Id for dataset in raw
                 */
                export type IId = string; // uuid
            }
            namespace Responses {
                export type I200 = Components.Schemas.IDataset;
            }
        }
    }
    namespace ApiDatasetSearchCategory {
        namespace Post {
            export type IRequestBody = Components.Schemas.IDatasetSearchByCategoryRequest;
            namespace Responses {
                export type I200 = Components.Schemas.IDatasetSummary[];
                export type I401 = Components.Schemas.IProblemDetails;
                export interface I500 {
                }
            }
        }
    }
    namespace ApiDatasetSearchPredictive {
        namespace Post {
            export type IRequestBody = Components.Schemas.IDatasetSearchByTermRequest;
            namespace Responses {
                export type I200 = Components.Schemas.IDatasetPredictiveSearch[];
                export type I401 = Components.Schemas.IProblemDetails;
                export interface I500 {
                }
            }
        }
    }
    namespace ApiDatasetSearchTerm {
        namespace Post {
            export type IRequestBody = Components.Schemas.IDatasetSearchByTermRequest;
            namespace Responses {
                export type I200 = Components.Schemas.IDatasetSummary[];
                export type I401 = Components.Schemas.IProblemDetails;
                export interface I500 {
                }
            }
        }
    }
    namespace ApiDuration {
        namespace Delete {
            export interface IQueryParameters {
                id?: Parameters.IId; // uuid
            }
            namespace Parameters {
                /**
                 * The id of the duration to delete
                 */
                export type IId = string; // uuid
            }
            namespace Responses {
                export interface I200 {
                }
            }
        }
        namespace Get {
            namespace Responses {
                export interface I200 {
                }
            }
        }
        namespace Post {
            export type IRequestBody = Components.Schemas.IDurationCreateRequest;
            namespace Responses {
                export interface I200 {
                }
            }
        }
        namespace Put {
            export type IRequestBody = Components.Schemas.IDurationUpdateRequest;
            namespace Responses {
                export interface I200 {
                }
            }
        }
    }
    namespace ApiDuration$Id {
        namespace Get {
            export interface IPathParameters {
                id: Parameters.IId; // uuid
            }
            namespace Parameters {
                /**
                 * The id of the duration to get
                 */
                export type IId = string; // uuid
            }
            namespace Responses {
                export interface I200 {
                }
                export type I401 = Components.Schemas.IProblemDetails;
                export interface I500 {
                }
            }
        }
    }
    namespace ApiGeneralConfidentiality {
        namespace Get {
            namespace Responses {
                export type I200 = Components.Schemas.IEnum[];
            }
        }
    }
    namespace ApiGeneralDatasetstatus {
        namespace Get {
            namespace Responses {
                export type I200 = Components.Schemas.IEnum[];
            }
        }
    }
    namespace ApiGeneralDuration {
        namespace Get {
            namespace Responses {
                export type I200 = Components.Schemas.IDuration[];
            }
        }
    }
    namespace ApiGeneralHierarchies {
        namespace Get {
            namespace Responses {
                export type I200 = Components.Schemas.IHierarchy[];
            }
        }
    }
    namespace ApiGeneralMemberrole {
        namespace Get {
            namespace Responses {
                export type I200 = Components.Schemas.IEnum[];
            }
        }
    }
    namespace ApiGeneralRefinementlevel {
        namespace Get {
            namespace Responses {
                export type I200 = Components.Schemas.IEnum[];
            }
        }
    }
    namespace ApiGeneralSorttype {
        namespace Get {
            namespace Responses {
                export type I200 = Components.Schemas.IEnum[];
            }
        }
    }
    namespace ApiGeneralSourcetypes {
        namespace Get {
            namespace Responses {
                export type I200 = Components.Schemas.IEnum[];
            }
        }
    }
    namespace ApiHierarchy {
        namespace Delete {
            export interface IQueryParameters {
                id?: Parameters.IId; // uuid
            }
            namespace Parameters {
                /**
                 * The id of the hierarchy to delete
                 */
                export type IId = string; // uuid
            }
            namespace Responses {
                export interface I200 {
                }
            }
        }
        namespace Get {
            namespace Responses {
                export interface I200 {
                }
            }
        }
        namespace Post {
            export type IRequestBody = Components.Schemas.IHierarchyCreateRequest;
            namespace Responses {
                export interface I200 {
                }
            }
        }
        namespace Put {
            export type IRequestBody = Components.Schemas.IHierarchyUpdateRequest;
            namespace Responses {
                export interface I200 {
                }
            }
        }
    }
    namespace ApiHierarchy$Id {
        namespace Get {
            export interface IPathParameters {
                id: Parameters.IId; // uuid
            }
            namespace Parameters {
                /**
                 * The id of the hierarchy to get
                 */
                export type IId = string; // uuid
            }
            namespace Responses {
                export interface I200 {
                }
                export type I401 = Components.Schemas.IProblemDetails;
                export interface I500 {
                }
            }
        }
    }
    namespace ApiMemberGroup {
        namespace Delete {
            export interface IQueryParameters {
                id?: Parameters.IId; // uuid
            }
            namespace Parameters {
                /**
                 * The id of the data source to delete
                 */
                export type IId = string; // uuid
            }
            namespace Responses {
                export interface I200 {
                }
            }
        }
        namespace Get {
            namespace Responses {
                export interface I200 {
                }
            }
        }
        namespace Post {
            export type IRequestBody = Components.Schemas.IMemberGroupCreateRequest;
            namespace Responses {
                export interface I200 {
                }
            }
        }
    }
    namespace ApiMemberGroup$Id {
        namespace Get {
            export interface IPathParameters {
                id: Parameters.IId; // uuid
            }
            namespace Parameters {
                /**
                 * The id of the member group to get
                 */
                export type IId = string; // uuid
            }
            namespace Responses {
                export interface I200 {
                }
                export type I401 = Components.Schemas.IProblemDetails;
                export interface I500 {
                }
            }
        }
    }
    namespace ApiMemberGroupMembergroups$Id {
        namespace Get {
            export interface IPathParameters {
                id: Parameters.IId; // uuid
            }
            namespace Parameters {
                /**
                 * The id of the member
                 */
                export type IId = string; // uuid
            }
            namespace Responses {
                export interface I200 {
                }
                export type I401 = Components.Schemas.IProblemDetails;
                export interface I500 {
                }
            }
        }
    }
    namespace ApiTransformation {
        namespace Delete {
            export interface IQueryParameters {
                id?: Parameters.IId; // uuid
            }
            namespace Parameters {
                /**
                 * The id of the transformation to delete
                 */
                export type IId = string; // uuid
            }
            namespace Responses {
                export interface I200 {
                }
            }
        }
        namespace Get {
            namespace Responses {
                export interface I200 {
                }
            }
        }
        namespace Post {
            export type IRequestBody = Components.Schemas.ITransformationCreateRequest;
            namespace Responses {
                export interface I200 {
                }
            }
        }
        namespace Put {
            export type IRequestBody = Components.Schemas.ITransformationUpdateRequest;
            namespace Responses {
                export interface I200 {
                }
            }
        }
    }
    namespace ApiTransformation$Id {
        namespace Get {
            export interface IPathParameters {
                id: Parameters.IId; // uuid
            }
            namespace Parameters {
                /**
                 * The id of the transformation to get
                 */
                export type IId = string; // uuid
            }
            namespace Responses {
                export interface I200 {
                }
                export type I401 = Components.Schemas.IProblemDetails;
                export interface I500 {
                }
            }
        }
    }
    namespace ApiTransformationGetbydatasets {
        namespace Post {
            /**
             * The datasets to find transformations for
             */
            export type IRequestBody = Components.Schemas.IGuidId[] | null;
            namespace Responses {
                export type I200 = Components.Schemas.ITransformation[];
                export type I401 = Components.Schemas.IProblemDetails;
                export interface I500 {
                }
            }
        }
    }
    namespace ApiUser {
        namespace Get {
            namespace Responses {
                export type I200 = Components.Schemas.IUser;
            }
        }
    }
}
