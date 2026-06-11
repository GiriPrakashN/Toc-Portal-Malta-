import * as React from 'react';
import * as ReactDom from 'react-dom';

import { Version } from '@microsoft/sp-core-library';

import {
  BaseClientSideWebPart
} from '@microsoft/sp-webpart-base';

import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'PixExecutivePortalWebPartStrings';

import PixExecutivePortal from './components/PixExecutivePortal';

import { IPixExecutivePortalProps } from './components/IPixExecutivePortalProps';

import { initializeSP } from './services/sp';

export interface IPixExecutivePortalWebPartProps {
  description: string;
}

export default class PixExecutivePortalWebPart
  extends BaseClientSideWebPart<IPixExecutivePortalWebPartProps> {

    
  public render(): void {

    initializeSP(this.context);

    const element: React.ReactElement<IPixExecutivePortalProps> =
      React.createElement(
        PixExecutivePortal,
        {
          userDisplayName:
            this.context.pageContext.user.displayName
        }
      );
      
      

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {

    return super.onInit();
  }

  protected onDispose(): void {

    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {

    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration():
    IPropertyPaneConfiguration {

    return {
      pages: [
        {
          header: {
            description:
              strings.PropertyPaneDescription
          },

          groups: [
            {
              groupName:
                strings.BasicGroupName,

              groupFields: [
                PropertyPaneTextField(
                  'description',
                  {
                    label:
                      strings.DescriptionFieldLabel
                  }
                )
              ]
            }
          ]
        }
      ]
    };
  }
}