﻿// -------------------------------------------------------------------------
//  Copyright © 2020 Province of British Columbia
//
//  Licensed under the Apache License, Version 2.0 (the "License");
//  you may not use this file except in compliance with the License.
//  You may obtain a copy of the License at
//
//  https://www.apache.org/licenses/LICENSE-2.0
//
//  Unless required by applicable law or agreed to in writing, software
//  distributed under the License is distributed on an "AS IS" BASIS,
//  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  See the License for the specific language governing permissions and
//  limitations under the License.
// -------------------------------------------------------------------------

using Microsoft.Dynamics.CRM;

namespace EMBC.Registrants.API.Shared
{
    public class LocationAutoMapperProfile : AutoMapper.Profile
    {
        public LocationAutoMapperProfile()
        {
            CreateMap<era_jurisdiction, Jurisdiction>()
                .ForMember(j => j.Code, opts => opts.MapFrom(o => o.era_jurisdictionid))
                .ForMember(j => j.Name, opts => opts.MapFrom(o => o.era_jurisdictionname))
                .ForMember(j => j.CountryCode, opts => opts.MapFrom(o => o.era_RelatedProvinceState == null
                    ? null
                    : o.era_RelatedProvinceState.era_RelatedCountry == null
                        ? null
                        : o.era_RelatedProvinceState.era_RelatedCountry.era_countrycode))
                .ForMember(j => j.StateProvinceCode, opts => opts.MapFrom(o => o.era_RelatedProvinceState == null
                        ? null
                        : o.era_RelatedProvinceState.era_code))
                .ForMember(j => j.Type, opts => opts.MapFrom(o => o.era_type.HasValue ? (JurisdictionType)o.era_type : JurisdictionType.Undefined))
                .ReverseMap()
                ;

            CreateMap<era_provinceterritories, StateProvince>()
                .ForMember(j => j.Code, opts => opts.MapFrom(o => o.era_code))
                .ForMember(j => j.Name, opts => opts.MapFrom(o => o.era_name))
                .ForMember(j => j.CountryCode, opts => opts.MapFrom(o => o.era_RelatedCountry == null
                    ? null
                    : o.era_RelatedCountry.era_countrycode))
                .ReverseMap()
                ;

            CreateMap<era_country, Country>()
                .ForMember(j => j.Code, opts => opts.MapFrom(o => o.era_countrycode))
                .ForMember(j => j.Name, opts => opts.MapFrom(o => o.era_name))
                .ReverseMap()
                ;
        }
    }
}
