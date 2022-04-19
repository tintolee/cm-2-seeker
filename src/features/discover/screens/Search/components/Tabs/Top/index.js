import React from 'react';
import {View, ScrollView} from 'react-native';
import Accounts from '../../../../../../../components/Search/Accounts';
import Opportunities from '../../../../../../../components/Search/Opportunities';
import Collaborations from '../../../../../../../components/Search/Collaborations';
import Seekers from '../../../../../../../components/Search/Seekers';
import RecentSearch from '../../RecentSearch';
import NoResults from '../../NoResults';
import styles from './styles';

export default function Top({result, searchValue, jumpToTab}) {
  return (
    <>
      {!result && searchValue === '' && <RecentSearch />}
      {!result && searchValue !== '' && <NoResults searchValue={searchValue} jumpToTab={jumpToTab} isShown/>}
      {result && (
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.content}>
              {result.providers.length > 0 && (
                <View style={styles.accounts}>
                  <Accounts
                    providers={result.providers}
                    jumpToTab={jumpToTab}
                  />
                </View>
              )}
              {result.seekers.length > 0 && (
                <View style={styles.accounts}>
                  <Seekers seekers={result.seekers} jumpToTab={jumpToTab} />
                </View>
              )}
              {result.opportunities.length > 0 && (
                <View style={styles.opportunities}>
                  <Opportunities
                    opportunities={result.opportunities}
                    jumpToTab={jumpToTab}
                  />
                </View>
              )}
              {result.collaborations.length > 0 && (
                <View style={styles.collaborations}>
                  <Collaborations
                    collaborations={result.collaborations}
                    jumpToTab={jumpToTab}
                  />
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}
