import { ArchitectureModel } from "./architectureModel";

export class ResourceModel{
    _id!: string;
    name?: string;
    architecture?: ArchitectureModel; 
}