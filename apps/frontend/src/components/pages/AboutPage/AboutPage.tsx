import { FontSize } from '../../../enums/FontSize';
import { FontWeight } from '../../../enums/FontWeight';
import Text from '../../atoms/text/Text';
import style from './AboutPage.module.css';

const AboutPage = () => {
  return (
    <div>
      <div className={style.aboutMovieBuddyWrapper}>
        <Text fontSize={FontSize.LARGE} fontWeight={FontWeight.Bold}>
          MovieBuddy ERD
        </Text>

        <img src={'/assets/NoSQLERD.png'} className={style.erdImage} />

      </div>
      <div className={style.aboutMovieBuddyWrapper}>
        <Text fontSize={FontSize.LARGE} fontWeight={FontWeight.Bold}>
          About MovieBuddy
        </Text>

        <Text>
          MovieBuddy is a social platform that helps users discover, review and keep track of movies. Users can create an account, login and manage their own profile. Every logged in user can review movies and add them to their personal watchlist together with a priority rating and viewing status. This makes the user able to keep track of what movies they planned on watching and which ones they already finished watching and what they liked or disliked about it. Other users can view their watchlist and reviews to discover new movies for themselves. Users are also capable of creating friendships with each other, making it possible to receive automatic movie recommendations based on their friends' tastes. The application also supports a role system where only admins can add, edit and remove movies. This guarantees that only trustworthy information is available to the users.
        </Text>

        <Text>
          The frontend is made in React with a modern client-sided user experience. The frontend is supported by two backend systems, the first being NestJs with MongoDb to store large amounts of user related information and the second being NestJs with Neo4j to model social relationships and recommendation data. MovieBuddy uses Atomic Design Pattern for the frontend, making a uniform design and user experience across the webpage possible. The backend is constructed using complex but readable Loosely Coupled architectural principles, where Clean Architecture and CQRS is used to divide the core business logic from the rest of the application. The API’s are written conforming to the rules of RESTful and authentication is handled using JWT and RoleGuard, to guarantee Authentication and Authorisation. The recommendations system supports complex query creation by utilizing dynamic parameters. MovieBuddy is a place for moviefans where they can not only manage their own preferences, but also discover new favorites using social networks.
        </Text>

      </div>
      <div className={style.aboutMovieBuddyWrapper}>
      <Text fontSize={FontSize.XLARGE} fontWeight={FontWeight.Bold}>Functional Requirements</Text>
      <table className={style.requirementsTable}>
        <thead className={style.header}>
        <tr>
          <th className={style.column}><Text fontWeight={FontWeight.Bold}>Requirement</Text></th>
          <th className={style.column}><Text fontWeight={FontWeight.Bold}>Acceptance Criteria</Text></th>
          <th className={style.column}><Text fontWeight={FontWeight.Bold}>MoSCoW</Text></th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td><Text>As a visitor, I want to create an account, so that I can use the app in a personalized way.</Text></td>
          <td>
            <Text>✓ Registration form with validation is available.</Text>
            <Text>✓ The user is automatically logged in after registration.</Text>
          </td>
          <td><Text>MoSCoW: __________</Text></td>
        </tr>
        <tr>
          <td><Text>As a user, I want to view my profile, so that I can see my information and activity.</Text></td>
          <td><Text>✓ Profile shows username and reviews.</Text></td>
          <td><Text>MoSCoW: __________</Text></td>
        </tr>
        <tr>
          <td><Text>As a user, I want to update my profile information, so that my details stay up to date.</Text></td>
          <td><Text>✓ Only certain fields like username can be updated.</Text></td>
          <td><Text>MoSCoW: __________</Text></td>
        </tr>
        <tr>
          <td><Text>As a user, I want to delete my account, so that my data is no longer stored.</Text></td>
          <td>
            <Text>✓ Deletion is permanent.</Text>
            <Text>✓ A warning is shown before deletion.</Text>
          </td>
          <td><Text>MoSCoW: __________</Text></td>
        </tr>
        <tr>
          <td><Text>As an admin, I want to add new movies, so that users can discover and review them.</Text></td>
          <td>
            <Text>✓ Only admins can access the add movie page.</Text>
            <Text>✓ Movie includes title, genres, description, release date, and IMDb ID.</Text>
          </td>
          <td><Text>MoSCoW: __________</Text></td>
        </tr>
        <tr>
          <td><Text>As a user, I want to browse movies, so that I can discover interesting titles and leave reviews.</Text></td>
          <td>
            <Text>✓ List includes title and genres.</Text>
            <Text>✓ Filtering is available.</Text>
          </td>
          <td><Text>MoSCoW: __________</Text></td>
        </tr>
        <tr>
          <td><Text>As a user, I want to view movie detail pages, so that I can learn more about a movie.</Text></td>
          <td><Text>✓ Details include description, genres and reviews.</Text></td>
          <td><Text>MoSCoW: __________</Text></td>
        </tr>
        <tr>
          <td><Text>As an admin, I want to update movies, so that incorrect or incomplete data can be fixed.</Text></td>
          <td>
            <Text>✓ Only admins see the "Edit movie" page.</Text>
            <Text>✓ Only valid updates are accepted.</Text>
          </td>
          <td><Text>MoSCoW: __________</Text></td>
        </tr>
        <tr>
          <td><Text>As an admin, I want to delete movies, so that irrelevant or incorrect titles are removed.</Text></td>
          <td><Text>✓ Only admins can delete.</Text></td>
          <td><Text>MoSCoW: __________</Text></td>
        </tr>
        <tr>
          <td><Text>As a user, I want to leave a review on a movie, so that I can share my opinion.</Text></td>
          <td>
            <Text>✓ User can select a rating (1–10) and write text.</Text>
            <Text>✓ Review appears under the movie.</Text>
          </td>
          <td><Text>MoSCoW: __________</Text></td>
        </tr>
        <tr>
          <td><Text>As a user, I want to read reviews on a movie, so that I can see what others think.</Text></td>
          <td><Text>✓ Reviews show score, text, and username.</Text></td>
          <td><Text>MoSCoW: __________</Text></td>
        </tr>
        <tr>
          <td><Text>As a user, I want to see the reviews I wrote, so that I can revisit my opinions.</Text></td>
          <td><Text>✓ Personal profile shows all reviews by the user.</Text></td>
          <td><Text>MoSCoW: __________</Text></td>
        </tr>
        <tr>
          <td><Text>As a user, I want to edit my review, so that I can update my opinion.</Text></td>
          <td><Text>✓ Only own reviews can be edited.</Text></td>
          <td><Text>MoSCoW: __________</Text></td>
        </tr>
        <tr>
          <td><Text>As a user, I want to delete my review, so that it is no longer public.</Text></td>
          <td><Text>✓ Only own reviews can be deleted.</Text></td>
          <td><Text>MoSCoW: __________</Text></td>
        </tr>
        <tr>
          <td><Text>As a user, I want to add movies to my watchlist, so that I can watch them later.</Text></td>
          <td><Text>✓ "Add to watchlist" button is available on movie pages.</Text></td>
          <td><Text>MoSCoW: __________</Text></td>
        </tr>
        <tr>
          <td><Text>As a user, I want to view my watchlist, so that I can keep track of movies I plan to watch.</Text></td>
          <td><Text>✓ Watchlist shows titles, priority, and watched status.</Text></td>
          <td><Text>MoSCoW: __________</Text></td>
        </tr>
        <tr>
          <td><Text>As a user, I want to update the watched status or priority of a movie, so that I can manage my movie plans.</Text></td>
          <td>
            <Text>✓ Priority can be set with minimum 1 (highest).</Text>
            <Text>✓ Watched toggle is available.</Text>
          </td>
          <td><Text>MoSCoW: __________</Text></td>
        </tr>
        <tr>
          <td><Text>As a user, I want to remove movies from my watchlist, so that I can keep it clean and relevant.</Text></td>
          <td><Text>✓ Only own items can be deleted.</Text></td>
          <td><Text>MoSCoW: __________</Text></td>
        </tr>
        <tr>
          <td><Text>As a user, I want to add another user as a friend, so that I can connect with them in the app.</Text></td>
          <td>
            <Text>✓ Cannot add yourself or someone you're already friends with.</Text>
            <Text>✓ Shows "Already friends" when applicable.</Text>
          </td>
          <td><Text>MoSCoW: __________</Text></td>
        </tr>
        <tr>
          <td><Text>As a user, I want to view my friends list, so that I can see who I’m connected with.</Text></td>
          <td><Text>✓ Displays user information of all current friends.</Text></td>
          <td><Text>MoSCoW: __________</Text></td>
        </tr>
        <tr>
          <td><Text>As a user, I want to remove a friend, so that I can manage my connections.</Text></td>
          <td><Text>✓ Button to unfriend is only shown for existing friends.</Text></td>
          <td><Text>MoSCoW: __________</Text></td>
        </tr>
        <tr>
          <td><Text>As a user, I want to receive movie recommendations, so that I can discover new movies that match my interests.</Text></td>
          <td>
            <Text>✓ Recommendations are based on friends’ reviews and scores (via Neo4j).</Text>
            <Text>✓ The frontend shows recommended movies and basic info with the average score.</Text>
          </td>
          <td><Text>MoSCoW: __________</Text></td>
        </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default AboutPage;
